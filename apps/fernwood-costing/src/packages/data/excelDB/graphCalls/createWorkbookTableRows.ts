import type { Client } from "@microsoft/microsoft-graph-client";
import type { DomainEvent } from "@packages/cqrs-es-types";

/**
 * https://docs.microsoft.com/en-us/graph/api/table-post-rows?view=graph-rest-1.0&tabs=http
 */
export default async (
  graphClient: Client,
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
