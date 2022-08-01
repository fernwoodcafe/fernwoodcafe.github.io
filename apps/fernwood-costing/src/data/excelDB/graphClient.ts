import type { DomainEvent } from "@/types/CafeDomain";
import { getTokenRedirect, signIn } from "./auth";
import { graphConfig, loginRequest } from "./msalConfig";

const fetchJson = async (request: Request) => {
  try {
    const tokenResponse = await getTokenRedirect(loginRequest);
    const bearer = `Bearer ${tokenResponse.accessToken}`;
    request.headers.append("Authorization", bearer);
    return fetch(request).then((response) => response.json());
  } catch {
    // If we need to sign in then do so.
    await signIn();
  }
};

export const httpPost = (endpoint: string, body: Record<string, unknown>) => {
  const request = new Request(endpoint, {
    method: "POST",
    headers: new Headers(),
    body: JSON.stringify(body),
  });

  return fetchJson(request);
};

export const httpGet = (endpoint: string) => {
  const request = new Request(endpoint, {
    method: "GET",
    headers: new Headers(),
  });

  return fetchJson(request);
};

// GET https://graph.microsoft.com/v1.0/me/drive/items/01CYZLFJGUJ7JHBSZDFZFL25KSZGQTVAUN/workbook/worksheets/Sheet32243
// content-type: Application/Json
// authorization: Bearer {access-token}
// workbook-session-id: {session-id}
const getEvents = async (
  sessionId: string,
  driveEndpoint: string,
  workbookId: string
) => {
  // const endpoint = `${driveEndpoint}/items/${workbookId}/workbook/worksheets/`;
  const endpoint = `${driveEndpoint}/items/${workbookId}/workbook/tables/EventStream/range`;

  const request = new Request(endpoint, {
    method: "GET",
    headers: new Headers({
      "workbook-session-id": sessionId,
    }),
  });

  const json = await fetchJson(request);

  console.log("graph:getEvents", json);

  return [];
};

const createPersistentSession = async (
  driveEndpoint: string,
  workbookId: string
) => {
  const endpoint = `${driveEndpoint}/items/${workbookId}/workbook/createSession`;
  const json = await httpPost(endpoint, {
    persistChanges: true,
  });

  return json.id;
};

export const $readMany = async (): Promise<DomainEvent[]> => {
  const sessionId = await createPersistentSession(
    graphConfig.graphDriveEndpoint,
    graphConfig.costingWorkbookId
  );

  console.log("graph:sessionId", sessionId);

  return getEvents(
    sessionId,
    graphConfig.graphDriveEndpoint,
    graphConfig.costingWorkbookId
  );
};
