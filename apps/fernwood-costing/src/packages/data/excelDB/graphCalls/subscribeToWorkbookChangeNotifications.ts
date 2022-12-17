import type { Client } from '@microsoft/microsoft-graph-client';

export default (
  graphClient: Client,
  workbookPath: string,
  tableName: string,
  listener: EventListener
) => {
  setInterval(() => listener(new Event("TODO")), 1000);
}
