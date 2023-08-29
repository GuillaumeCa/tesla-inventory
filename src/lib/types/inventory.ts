export const FactoryCode = {
  GF00: "Fremont 🇺🇸",
  GF01: "Giga Nevada 🇺🇸",
  GF02: "Giga New York 🇺🇸",
  GF03: "Giga Shangai 🇨🇳",
  GF04: "Giga Texas 🇺🇸",
  GF05: "Giga Berlin 🇩🇪",
};

export const Paint = {
  BLACK: "Noir",
};
export const Model = {
  my: "Model Y",
  mx: "Model X",
  m3: "Model 3",
  ms: "Model S",
};

export const Trim = {
  MYRWD: "Propulsion",
  LRAWD: "Grande Autonomie",
  MSAWD: "Grande Autonomie",
  MSPLAID: "Plaid",
  MXAWD: "Grande Autonomie",
  MXPLAID: "Plaid",
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
  OptionCodeSpecs: Record<string, OptionCodeSpecsValue>;
  VIN: string;
  Year: number;
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

export interface OptionCodeSpecsValue {
  code: string;
  name: string;
  options: OptionCodeSpecsValueOption[];
}

export interface OptionCodeSpecsValueOption {
  code: string;
  name: string;
  long_name: string;
  description: string;
}
