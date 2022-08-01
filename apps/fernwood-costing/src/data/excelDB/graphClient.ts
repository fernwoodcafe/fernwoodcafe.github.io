import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";
import {
  AuthCodeMSALBrowserAuthenticationProvider,
  type AuthCodeMSALBrowserAuthenticationProviderOptions,
} from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { msalConfig } from "./msalConfig";

const publicClientApplication = new PublicClientApplication(msalConfig);
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

export const graphClient = Client.initWithMiddleware({
  authProvider,
});
