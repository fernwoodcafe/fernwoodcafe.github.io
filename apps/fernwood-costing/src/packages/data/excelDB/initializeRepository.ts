import type {
  DomainEvent,
  DomainEventsRepository,
} from "@packages/cqrs-es-types";
import createWorkbookTableRows from "./graphCalls/createWorkbookTableRows";
import getWorkbookTableRange from "./graphCalls/getWorkbookTableRange";
import initializeGraphClient from "./initializeGraphClient";
import intervalRunner from "./services/intervalRunner";
import statusPublisher from "./services/statusPublisher";

export default async (): Promise<DomainEventsRepository> => {
  const costingWorkbookPath = "CostingApp-EventStore.xlsx";
  const costingEventsTableName = "EventStream";
  const graphClient = await initializeGraphClient();

  const createWorkbookTableRowsInterval = intervalRunner<DomainEvent>(
    (events) =>
      createWorkbookTableRows(
        graphClient,
        costingWorkbookPath,
        costingEventsTableName,
        events
      ),
    2_000,
    statusPublisher
  );

  const repository: DomainEventsRepository = {
    insert: async (event: DomainEvent): Promise<DomainEvent> => {
      createWorkbookTableRowsInterval.enqueue(event);
      return event;
    },
    select: async (): Promise<DomainEvent[]> => {
      const tableRange = await getWorkbookTableRange(
        graphClient,
        costingWorkbookPath,
        costingEventsTableName
      );

      // Slice off the first row; it contains our headers.
      // Map only the first column; it contains our event.
      // Filter empty columns that may have snuck into the data.
      return tableRange
        .slice(1)
        .map((row) => row[0])
        .filter((cell) => cell.trim().length !== 0)
        .map((cell) => JSON.parse(cell));
    },
    addListener: statusPublisher.addListener,
  };

  return repository;
};
