import type { Client } from "@microsoft/microsoft-graph-client";
import type { WorkbookTableRow } from "@microsoft/microsoft-graph-types";

/**
 * Prototype! Check for new events at the server!
 *
 * Add those to the materialized view _before_ processing the current clients new
 * events. Make sure that persisted events take precedent over new events. Perhaps
 * make that part of command validation, such that a command does not create an
 * event until _after_ checking for events from other clients.
 *
 * As another thought, perhaps our DomainEvent[] needs to have a pub/sub mechanism,
 * so that the materializers only access events _after_ they persist in the server.
 * That would make for higher reliability at the expense of a more sluggish UI.
 */
export default async (
  graphClient: Client,
  workbookPath: string,
  tableName: string,
  skip: number,
  listener: EventListener
) => {
  const endpoint = `/me/drive/root:/${workbookPath}:/workbook/tables/${tableName}/rows`;
  const endpointPlusQuery = endpoint + "?" + `$skip=${skip}`;
  const response = await graphClient.api(endpointPlusQuery).get();

  response.value.forEach((value: WorkbookTableRow) => {
    console.log(value.index);
    console.log(value.values[0]);
  })

  // setInterval(() => {
  //   console.log(workbookPath);
  //   listener(new Event("TODO"));
  // }, 1000);
};
