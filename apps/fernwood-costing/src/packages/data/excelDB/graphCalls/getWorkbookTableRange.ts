import type { Client } from "@microsoft/microsoft-graph-client";

/**
 * https://docs.microsoft.com/en-us/graph/api/table-range?view=graph-rest-1.0&tabs=http
 */
export default async (
  graphClient: Client,
  workbookPath: string,
  tableName: string
): Promise<string[][]> => {
  const endpoint = `/me/drive/root:/${workbookPath}:/workbook/tables/${tableName}/range`;
  const response = await graphClient.api(endpoint).get();
  return response.values;
};
