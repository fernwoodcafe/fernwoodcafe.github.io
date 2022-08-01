import type { DomainEvent, DomainEventsRepository } from "@/types/CafeDomain";
import { graphClient } from "./graphClient";

const costingWorkbookPath = "CostingApp-EventStore.xlsx";
const costingEventsTableName = "EventStream";

/**
 * https://docs.microsoft.com/en-us/graph/api/table-range?view=graph-rest-1.0&tabs=http
 */
const getWorkbookTableRange = async (
  workbookPath: string,
  tableName: string
) => {
  const endpoint = `/me/drive/root:/${workbookPath}:/workbook/tables/${tableName}/range`;
  const response = await graphClient.api(endpoint).get();
  console.log("graph:range", response);
  return [];
};

/**
 * https://docs.microsoft.com/en-us/graph/api/table-post-rows?view=graph-rest-1.0&tabs=http
 */
const createWorkbookTableRow = (workbookPath: string, tableName: string) => {};

export default (): DomainEventsRepository => ({
  insert: (event: DomainEvent): Promise<DomainEvent> => {
    throw new Error("Not implemented");
  },
  select: (): Promise<DomainEvent[]> =>
    getWorkbookTableRange(costingWorkbookPath, costingEventsTableName).then(
      (events: DomainEvent[]) =>
        events.sort((a, b) => a.eventIndex - b.eventIndex)
    ),
});
