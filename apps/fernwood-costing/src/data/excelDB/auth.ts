import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "./msalConfig";

// configuration parameters are located at authConfig.js
export const myMSALObj = new PublicClientApplication(msalConfig);

// Redirect: once login is successful and redirects with tokens, call Graph API
myMSALObj
  .handleRedirectPromise()
  .then((response) => {
    if (response && response.account) {
      myMSALObj.setActiveAccount(response.account);
    }
  })
  .catch((err) => {
    console.error(err);
  });

export const signIn = () => myMSALObj.loginRedirect(loginRequest);

export const getTokenRedirect = (request) =>
  myMSALObj.acquireTokenSilent(request);
