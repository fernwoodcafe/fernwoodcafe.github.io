import type {
  DomainEvent,
  DomainEventsRepository,
} from "@packages/cqrs-es-types";
import type { Emits } from "@packages/cqrs-es-types/DomainEventsRepository";
import { emits } from "@packages/cqrs-es-types/DomainEventsRepository";
import initializeGraphClient from "./initializeGraphClient";

const costingWorkbookPath = "CostingApp-EventStore.xlsx";
const costingEventsTableName = "EventStream";
const graphClient = await initializeGraphClient();

/**
 * https://docs.microsoft.com/en-us/graph/api/table-range?view=graph-rest-1.0&tabs=http
 */
const getWorkbookTableRange = async (
  workbookPath: string,
  tableName: string
): Promise<string[][]> => {
  const endpoint = `/me/drive/root:/${workbookPath}:/workbook/tables/${tableName}/range`;
  const response = await graphClient.api(endpoint).get();
  return response.values;
};

/**
 * https://docs.microsoft.com/en-us/graph/api/table-post-rows?view=graph-rest-1.0&tabs=http
 */
const createWorkbookTableRows = async (
  workbookPath: string,
  tableName: string,
  domainEvents: DomainEvent[]
) => {
  // TODO [should-have] Copy the EventStore schema for storage here.
  const workbookTableRows = {
    values: domainEvents.map((event) => [JSON.stringify(event)]),
  };

  graphClient
    .api(`/me/drive/root:/${workbookPath}:/workbook/tables/${tableName}/rows`)
    .version("beta")
    .post(workbookTableRows);
};

const emitManager = (() => {
  const eventListeners = new Map<Emits, EventListener[]>(
    emits.map((name) => [name, []])
  );

  return {
    addListener: (name: Emits, listener: EventListener) => {
      eventListeners.get(name).push(listener);
      return listener;
    },
    onSaved: () =>
      eventListeners
        .get("onSaved")
        .forEach((handler) => handler(new Event("saved"))),
    onQueued: () =>
      eventListeners
        .get("onQueued")
        .forEach((handler) => handler(new Event("queued"))),
  };
})();

// TODO [must-have] Add an 'Unsaved Changes" and "Saved" message in the UI.
// TODO [must-have] Warn the user before navigating away if we have unsaved changes.
// TODO [should-have] Add retry logic for recoverable errors. Ensure the retry
// routine persists the order of events. For example, do not start sending batch
// two if batch one has not yet succeeded.
const insertOnInterval = (() => {
  let events = [];
  const thresholdMs = 5_000;

  setInterval(async () => {
    if (events.length === 0) {
      return;
    }

    await createWorkbookTableRows(
      costingWorkbookPath,
      costingEventsTableName,
      events
    );

    emitManager.onSaved();

    // Clear the events.
    events = [];
  }, thresholdMs);

  return {
    enqueue: (e: DomainEvent) => {
      emitManager.onQueued();
      events.push(e);
      return insertOnInterval;
    },
  };
})();

const repository: DomainEventsRepository = {
  insert: async (event: DomainEvent): Promise<DomainEvent> => {
    insertOnInterval.enqueue(event);
    return event;
  },
  select: async (): Promise<DomainEvent[]> => {
    const tableRange = await getWorkbookTableRange(
      costingWorkbookPath,
      costingEventsTableName
    );

    const domainEvents = tableRange
      .slice(1)
      .map((row) => row[0])
      // Sometimes empty columns have snuck in in the past.
      .filter((cell) => cell.trim().length !== 0)
      .map((cell) => JSON.parse(cell));

    return domainEvents;
  },
  addListener: emitManager.addListener,
};

export default () => repository;
