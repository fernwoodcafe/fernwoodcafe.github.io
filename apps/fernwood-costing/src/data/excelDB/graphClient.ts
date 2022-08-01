import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";
import {
  AuthCodeMSALBrowserAuthenticationProvider,
  type AuthCodeMSALBrowserAuthenticationProviderOptions,
} from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { msalConfig } from "./msalConfig";

console.log("foo");

const publicClientApplication = new PublicClientApplication(msalConfig);

// Redirect: once login is successful and redirects with tokens, call Graph API
const response = await publicClientApplication.handleRedirectPromise();

console.log(response);

publicClientApplication.setActiveAccount(response.account);

const options: AuthCodeMSALBrowserAuthenticationProviderOptions = {
  // For account see https://github.com/microsoftgraph/msgraph-sdk-javascript/issues/505
  account: null,
  interactionType: InteractionType.Redirect,
  scopes: ["Files.ReadWrite"],
};

const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
  publicClientApplication,
  options
);

console.log("baz");

export const graphClient = Client.initWithMiddleware({
  authProvider,
});
