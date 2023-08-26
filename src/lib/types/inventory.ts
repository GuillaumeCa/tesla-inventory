export const FactoryCode = {
  GF00: "Fremont 🇺🇸",
  GF03: "Giga Shangai 🇨🇳",
  GF05: "Giga Berlin 🇩🇪",
};

export const Paint = {
  BLACK: "Noir",
};
export const Model = {
  my: "Model Y",
  m3: "Model 3",
  ms: "Model S",
};

export const Trim = {
  MYRWD: "Propulsion",
  LRAWD: "Long Range",
  MSAWD: "Long Range",
  MSPLAID: "Plaid",
};

export interface InventoryEntry {
  Model: keyof typeof Model;
  AUTOPILOT: string[];
  FactoryCode: keyof typeof FactoryCode;
  Discount: number;
  InventoryPrice: number;
  TotalPrice: number;
  PurchasePrice: number;
  IsChargingConnectorIncluded: boolean;
  IsDemo: boolean;
  IsAtLocation: boolean;
  IsInTransit: boolean;
  PAINT: (keyof typeof Paint)[];
  OptionCodeData: OptionCodeDataItem[];
  Hash: string;
  TRIM: (keyof typeof Trim)[];
  OptionCodeList: string;
  VIN: string;
}

export interface OptionCodeDataItem {
  acceleration_unit_long?: string;
  acceleration_unit_short?: string;
  acceleration_value?: string;
  code: string;
  group: string;
  price?: number;
  unit_long?: string;
  unit_short?: string;
  value?: string;
  top_speed_label?: string;
  range_label_source?: string;
  range_source?: string;
  range_source_inventory_new?: string;
  description?: string;
  long_name?: string;
  name?: string;
}
