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

const createPersistentSession = async (
  driveEndpoint: string,
  workbookPath: string
) => {
  const endpoint = `${driveEndpoint}/root:/${workbookPath}:/workbook/createSession`;
  const json = await httpPost(endpoint, {
    persistChanges: true,
  });

  return json.id;
};

const getWorkbookTableRange = (
  sessionId: string,
  driveEndpoint: string,
  workbookPath: string,
  tableName: string
) => {
  const endpoint = `${driveEndpoint}/root:/${workbookPath}:/workbook/tables/${tableName}/range`;

  const request = new Request(endpoint, {
    method: "GET",
    headers: new Headers({
      "workbook-session-id": sessionId,
    }),
  });

  return fetchJson(request);
};

const getEvents = async (
  sessionId: string,
  driveEndpoint: string,
  workbookPath: string,
  tableName: string
) => {
  const json = await getWorkbookTableRange(
    sessionId,
    driveEndpoint,
    workbookPath,
    tableName
  );

  console.log("graph:getEvents", json);

  return [];
};

export const $readMany = async (): Promise<DomainEvent[]> => {
  const sessionId = await createPersistentSession(
    graphConfig.graphDriveEndpoint,
    graphConfig.costingWorkbookPath
  );

  console.log("graph:sessionId", sessionId);

  return getEvents(
    sessionId,
    graphConfig.graphDriveEndpoint,
    graphConfig.costingWorkbookPath,
    graphConfig.costingEventsTableName
  );
};
