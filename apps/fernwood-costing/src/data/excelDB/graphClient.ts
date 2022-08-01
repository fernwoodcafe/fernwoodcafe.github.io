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
    await signIn();
  }
};

export const httpPost = (endpoint, body) => {
  const request = new Request(endpoint, {
    method: "POST",
    headers: new Headers(),
    body: JSON.stringify(body),
  });

  return fetchJson(request);
};

export const httpGet = (endpoint) => {
  const request = new Request(endpoint, {
    method: "GET",
    headers: new Headers(),
  });

  return fetchJson(request);
};

export const $readMany = async (): Promise<DomainEvent[]> => {
  const workbookId = "01WODPJHNUFIDRETOZIRDL77KL5NJ7RRVS";
  const json = await httpPost(
    `${graphConfig.graphDriveEndpoint}/items/${workbookId}/workbook/createSession`,
    {
      persistChanges: true,
    }
  );

  console.log(json);

  return [];
};
