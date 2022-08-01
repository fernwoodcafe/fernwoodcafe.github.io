import type { DomainEvent } from "@/types/CafeDomain";
import { getTokenRedirect, signIn } from "./auth";
import { graphConfig, loginRequest } from "./msalConfig";

export const httpPost = (endpoint, body, accessToken, callback) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };

  fetch(endpoint, options)
    .then((response) => response.json())
    .then((response) => callback(response, endpoint))
    .catch((error) => console.log(error));
};

export const httpGet = (endpoint, accessToken, callback) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers,
  };

  fetch(endpoint, options)
    .then((response) => response.json())
    .then((response) => callback(response, endpoint))
    .catch((error) => console.log(error));
};

export const seeProfile = async () => {
  const response = await getTokenRedirect(loginRequest);
  httpGet(graphConfig.graphMeEndpoint, response.accessToken, (data, endpoint) =>
    console.log("msGraphResponse", endpoint, data)
  );
};

export const fetchExcelData = async () => {
  const response = await getTokenRedirect(loginRequest);

  httpGet(
    graphConfig.graphDriveEndpoint,
    response.accessToken,
    (data, endpoint) => console.log("msGraphResponse", endpoint, data)
  );
};

export const $readMany = async (): Promise<DomainEvent[]> => {
  const workbookId = "01WODPJHNUFIDRETOZIRDL77KL5NJ7RRVS";
  try {
    const tokenResponse = await getTokenRedirect(loginRequest);
    httpPost(
      // `${graphConfig.graphDriveEndpoint}/root/children/`,
      `${graphConfig.graphDriveEndpoint}/items/${workbookId}/workbook/createSession`,
      {
        persistChanges: true,
      },
      tokenResponse.accessToken,
      (data, endpoint) => console.log("msGraphResponse", endpoint, data)
    );

    return [];
  } catch {
    await signIn();
  }
};
