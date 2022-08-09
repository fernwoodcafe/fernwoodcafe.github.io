import { LogLevel, type Configuration } from "@azure/msal-browser";

/**
 * To view Azure Active Directory settings:
 * 1. portal.azure.com
 * 2. Sign in as shaun@fernwoodcafe.onmicrosoft.com
 * 3. Go to Hamburger > Azure Active Directory > App Registrations > Fernwood Costing App.
 *
 * E.g., We register client applications under "Authentication".
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: "cae7e594-2307-4888-a321-a17a5f2e70fb",
    authority:
      "https://login.microsoftonline.com/9b761c82-8867-470b-8d76-e5e9e0765377",
    redirectUri: import.meta.env.BASE_URL,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Error,
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            console.log(message);
            return;
        }
      },
    },
  },
};
