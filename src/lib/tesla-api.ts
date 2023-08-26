import mockData from "app/mockdata/response-example.json";
import { InventoryEntry } from "./types/inventory";

function delay(timeMs = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
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
  };
}

export async function searchInventory(query: any): Promise<InventoryEntry[]> {
  const mock = mockData.results as InventoryEntry[];
  // return delay(100).then(() => mock.map(mapData));
  const params = new URLSearchParams();
  params.set("query", JSON.stringify(query));
  const url =
    "https://www.tesla.com/inventory/api/v1/inventory-results?" +
    params.toString();
  // return mock;
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data.total_matches_found > 0 ? data.results.map(mapData) : [];
  }

  return [];
}
