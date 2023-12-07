import mockData from "app/mockdata/response-example.json";
import { InventoryEntry } from "./types/inventory";

const baseURL = "https://www.tesla.com/inventory/api/v4";

const REQUEST_TIMEOUT = 15 * 1000;

function delay(timeMs = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
}

async function fetchWithTimeout(
  resource: string,
  options: RequestInit = {},
  timeout = REQUEST_TIMEOUT
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

function mapData(entry: InventoryEntry): InventoryEntry {
  return {
    AUTOPILOT: entry.AUTOPILOT,
    Discount: entry.Discount,
    FactoryCode: entry.FactoryCode,
    Hash: entry.Hash,
    Model: entry.Model,
    InventoryPrice: entry.InventoryPrice,
    TotalPrice: entry.TotalPrice,
    PurchasePrice: entry.PurchasePrice,
    IsChargingConnectorIncluded: entry.IsChargingConnectorIncluded,
    IsDemo: entry.IsDemo,
    IsAtLocation: entry.IsAtLocation,
    IsInTransit: entry.IsInTransit,
    PAINT: entry.PAINT,
    OptionCodeData: entry.OptionCodeData,
    TRIM: entry.TRIM,
    OptionCodeList: entry.OptionCodeList,
    VIN: entry.VIN,
    Year: entry.Year,
    OptionCodeSpecs: entry.OptionCodeSpecs,
  };
}

const baseHeaders = {
  accept: "application/json",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
};

export async function searchInventory(query: any): Promise<InventoryEntry[]> {
  const mock = mockData.results as InventoryEntry[];
  // return delay(100).then(() => mock.map(mapData));
  const params = new URLSearchParams();

  // TODO: fix later
  // const csrf = await sessionCheck();

  // if (!csrf) {
  //   return [];
  // }

  // const address = await searchAddress(query.query.zip, csrf);

  // query.query.lng = address?.longitude;
  // query.query.lat = address?.latitude;

  params.set("query", JSON.stringify(query));
  const url = baseURL + "/inventory-results?" + params.toString();
  // return mock;
  console.log("load inventory");
  const res = await fetchWithTimeout(url, {
    headers: baseHeaders,
  });
  if (res.ok) {
    const data = await res.json();
    return data.total_matches_found > 0 ? data.results.map(mapData) : [];
  }

  console.error("could not load inventory, status: ", res.status);
  return [];
}

type Address = {
  city: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  countryName: string;
  longitude: number;
  latitude: number;
  county: string;
  stateCode: string;
};

type SessionCheck = {
  csrf_key: string;
  csrf_token: string;
};

export async function sessionCheck(): Promise<SessionCheck | null> {
  const res = await fetchWithTimeout(baseURL + "/sesscheck", {
    method: "POST",
    headers: baseHeaders,
  });

  if (res.ok) {
    const json = await res.json();
    console.log("sesscheck data", json);
    return json;
  }

  console.error("could not load sesscheck, status: ", res.status);
  res.json().then((err) => console.error(err));

  return null;
}

export async function searchAddress(
  zip: string,
  csrf: SessionCheck
): Promise<Address | null> {
  console.log("load address");
  const res = await fetchWithTimeout(baseURL + "/address", {
    method: "POST",
    headers: {
      ...baseHeaders,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      postal_code: zip,
      country_code: "FR",
      csrf_name: csrf.csrf_key,
      csrf_value: csrf.csrf_token,
    }),
  });

  if (res.ok) {
    const json = await res.json();
    return json.data;
  }

  console.error("could not load address, status: ", res.status);
  res.json().then((err) => console.error(err));

  return null;
}
