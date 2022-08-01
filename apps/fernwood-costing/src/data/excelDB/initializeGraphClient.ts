import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";
import {
  AuthCodeMSALBrowserAuthenticationProvider,
  type AuthCodeMSALBrowserAuthenticationProviderOptions,
} from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { msalConfig } from "./msalConfig";

export default async () => {
  const publicClientApplication = new PublicClientApplication(msalConfig);

  // See https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/errors.md#interaction_in_progress
  await publicClientApplication.handleRedirectPromise();

  const activeAccount = publicClientApplication.getAllAccounts()?.[0];
  if (!activeAccount) {
    // TODO [nice-to-have] Log in silently when we can e.g. via ssoSilent or acquireTokenSilent.
    await publicClientApplication.loginRedirect();
  }

  const options: AuthCodeMSALBrowserAuthenticationProviderOptions = {
    account: activeAccount,
    interactionType: InteractionType.Redirect,
    scopes: ["Files.ReadWrite"],
  };

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    publicClientApplication,
    options
  );

  return Client.initWithMiddleware({
    authProvider,
  });
};
