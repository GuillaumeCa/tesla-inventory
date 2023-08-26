"use client";
import { InventoryEntry } from "app/lib/types/inventory";
import { useSearchParams } from "next/navigation";
import { CarInfoPreview } from "./car-info-preview";

export function SelectedCar({ inventory }: { inventory: InventoryEntry[] }) {
  const queryParam = useSearchParams();
  const selected = queryParam.get("selected");
  const entry = inventory.find((inv) => inv.Hash === selected);
  if (!selected || !entry) {
    return null;
  }

  return (
    <div className="w-[300px] sticky top-3 space-y-4">
      <div className="rounded-lg bg-gray-100 p-3 border-t-8 border-blue-600">
        <CarInfoPreview entry={entry} />
      </div>
      <div className="rounded-lg bg-gray-100 p-3 space-y-2">
        <CarInfo
          label="Vehicule de Démo"
          value={entry.IsDemo ? "Oui" : "Non"}
        />
        <CarInfo label="En transit" value={entry.IsInTransit ? "Oui" : "Non"} />
        <CarInfo
          label="Connecteur de charge inclu"
          value={entry.IsChargingConnectorIncluded ? "Oui" : "Non"}
        />
        <CarInfo label="VIN" value={entry.VIN.split("_")[0] + "*****"} />
      </div>
    </div>
  );
}

function CarInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="uppercase font-semibold text-xs text-gray-500">{label}</p>
      <p>{value}</p>
    </div>
  );
}
