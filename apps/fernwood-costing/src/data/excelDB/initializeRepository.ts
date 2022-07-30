import { useMsal } from "@/auth-msft/useMsal";
import { graphConfig, loginRequest } from "@/authConfig";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";

const { instance, inProgress } = useMsal();

export const callMsGraph = async (accessToken: string) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getGraphData = async () => {
  const response = await instance
    .acquireTokenSilent({
      ...loginRequest,
    })
    .catch(async (e) => {
      if (e instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect(loginRequest);
      }
      throw e;
    });
  if (inProgress.value === InteractionStatus.None) {
    const graphData = await callMsGraph(response.accessToken);
    return graphData;
  }
};

export default getGraphData;
