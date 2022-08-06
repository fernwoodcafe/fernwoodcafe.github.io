import type { DomainEvent, DomainEventsRepository } from "@/domain";
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
) => {
  const endpoint = `/me/drive/root:/${workbookPath}:/workbook/tables/${tableName}/range`;
  const response = await graphClient.api(endpoint).get();
  return response.values;
};

/**
 * https://docs.microsoft.com/en-us/graph/api/table-post-rows?view=graph-rest-1.0&tabs=http
 */
const createWorkbookTableRow = async (
  workbookPath: string,
  tableName: string,
  domainEvent: DomainEvent
) => {
  // TODO Copy the EventStore schema for storage here.
  const workbookTableRow = {
    values: [
      // Row
      [
        // Column
        JSON.stringify(domainEvent),
      ],
    ],
  };

  await graphClient
    .api(`/me/drive/root:/${workbookPath}:/workbook/tables/${tableName}/rows`)
    .version("beta")
    .post(workbookTableRow);
};

export default (): DomainEventsRepository => ({
  insert: async (event: DomainEvent): Promise<DomainEvent> => {
    await createWorkbookTableRow(
      costingWorkbookPath,
      costingEventsTableName,
      event
    );
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
      .map((cell) => JSON.parse(cell));

    console.log("domainEvents", domainEvents);

    return domainEvents;
  },
});
