import {
  IN_DEV_MODE,
  DEV_COOKIES,
  XSRF_TOKEN,
  SUPEROFFICE_URL,
  SUPEROFFICE_SERVICE_URL,
  CRMSCRIPT_ENDPOINT,
  CRMSCRIPT_ENDPOINT_ACTION
} from "../superoffice-config/superoffice-config";

// Set dev cookies to local browser when in development mode
if (IN_DEV_MODE) {
  DEV_COOKIES.split("; ").forEach(cookie => (document.cookie = cookie));
}

/**
 * Base interface for what will be returned from SuperOffice REST API.
 */
export interface SuperOfficeObject {
  PrimaryKey: number;
  EntityName: string;
  [key: string]: any; // Can be any number of properties with different types.
}

/** Default headers for REST API requests (for when calling REST API from inside SuperOffice) */
function restApiDefaultHeaders(): HeadersInit {
  return {
    "X-XSRF-TOKEN": XSRF_TOKEN,
    Accept: "application/json",
    PartnerOrigin: "Cloud Connection" // Non-mandatory field, but added to identify ourselves to SuperOffice.
  };
}

/**
 * A generic SuperOffice REST API GET request.
 * Returns an array of whatever entity you are querying.
 * Docs: https://docs.superoffice.com/en/api/netserver/search/odata/index.html
 */
export async function httpRestApiQuery(options: {
  entity: string;
  select?: string;
  filter?: string;
  orderBy?: string;
  top?: number;
  skip?: number;
  mode?: string;
}): Promise<SuperOfficeObject[]> {
  const {
    entity,
    select = null,
    filter = null,
    orderBy = null,
    top = null,
    skip = null,
    mode = null
  } = options;

  const urlParams = new URLSearchParams();
  if (select) urlParams.append("$select", select);
  if (filter) urlParams.append("$filter", filter);
  if (orderBy) urlParams.append("$orderby", orderBy);
  if (top) urlParams.append("$top", top.toString());
  if (skip) urlParams.append("$skip", skip.toString());
  if (mode) urlParams.append("$skip", mode);

  const url = `${SUPEROFFICE_URL}/api/v1/${entity}?${urlParams.toString()}`;

  try {
    const response = await fetch(url, {
      headers: restApiDefaultHeaders()
    });

    if (!response.ok) throw new Error(`HTTP error - Status: ${response.status}`);
    const jsonResponse = await response.json();
    return jsonResponse.value;
  } catch (error) {
    console.error("Error fetching the data:", error);
    throw error;
  }
}

/**
 * A template for calling a CRMScript GET web service.
 * Uses customer.fcgi when in development mode, and blogic when in production mode.
 */
export async function httpGetCRMScriptWebService(): Promise<object> {
  const urlParams = new URLSearchParams({
    action: CRMSCRIPT_ENDPOINT_ACTION,
    includeId: "",
    key: ""
  });

  const url = `${SUPEROFFICE_SERVICE_URL}/scripts/${CRMSCRIPT_ENDPOINT}?${urlParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error - Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching the data:", error);
    throw error;
  }
}
