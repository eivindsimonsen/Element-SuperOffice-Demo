/** Gets the value of a given cookie. Provide with all cookies from browser. */
function getCookie(allCookies: string, cookieName: string): string {
  const cookieValue = allCookies
    .split("; ")
    .map(cookie => cookie.split("="))
    .find(([name]) => name === cookieName)?.[1];

  return cookieValue ?? ""; // Return empty string if cookie was not found
}

/**
 * Gets XSRF Token from the current document in browser.
 * Ensures this only runs in a production environment where document is accessible, to prevent build failure.
 */
function getXSRFTokenFromDocument(): string {
  if (typeof document === "undefined") return "";
  return getCookie(document.cookie, "XSRF-TOKEN");
}

/**
 * Determines the current SuperOffice Online URL based on context, for when app is in production.
 * Returns: URL like https://online.superoffice.com/CustXXXXX/
 */
function resolveCurrentSuperOfficeOnlineUrl(): string {
  const currentUrl: string = window.location.href;
  const custPattern: string = "superoffice.com/Cust";
  const custIndex: number = currentUrl.indexOf(custPattern);

  if (custIndex === -1)
    throw new Error("Could not resolve current SuperOffice URL from window.location.href");

  // Calculate the index to include the slash after the Cust number.
  const startIndexAfterCust = custIndex + custPattern.length;
  const endIndex = currentUrl.indexOf("/", startIndexAfterCust) + 1; // +1 to include the slash

  // Extract URL including the Cust number and the following slash
  return currentUrl.substring(0, endIndex);
}

/**
 * Cookies used when calling SuperOffice REST API in development.
 * Copy and paste cookies to env.development.
 */
export const DEV_COOKIES: string = import.meta.env.VITE_DEV_COOKIES;
export const IN_DEV_MODE: boolean = import.meta.env.MODE === "development";

// In production: Use current SuperOffice Online URL that the app is in context of.
// Switches to api in DEV mode because of proxy (see vite.config.js)
export const SUPEROFFICE_URL: string = IN_DEV_MODE ? "/api" : resolveCurrentSuperOfficeOnlineUrl();

/** Default service URL for SuperOffice Online tenants. */
export const SUPEROFFICE_SERVICE_URL: string = `${SUPEROFFICE_URL}/CS/`;

export const XSRF_TOKEN: string = IN_DEV_MODE
  ? getCookie(DEV_COOKIES, "XSRF-TOKEN")
  : getXSRFTokenFromDocument();

// Variables that allows us to easily switch between customer.fcgi and blogic.fcgi ways of calling CRMScript endpoints:
export const CRMSCRIPT_ENDPOINT: string = IN_DEV_MODE ? "customer.fcgi" : "blogic.fcgi";
export const CRMSCRIPT_ENDPOINT_ACTION: string = IN_DEV_MODE ? "safeParse" : "doScript";
