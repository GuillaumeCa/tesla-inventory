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
    <div className="w-[500px] sticky top-3 space-y-4 h-screen overflow-auto">
      <div className="rounded-lg bg-gray-100 p-3 border-t-8 border-blue-600">
        <CarInfoPreview entry={entry} />
      </div>
      <a
        className="bg-gray-500 hover:bg-blue-600 block text-center text-white font-semibold px-3 py-3 rounded-lg"
        target="_blank"
        href={buildOpenUrl(entry)}
      >
        Voir sur tesla.com
      </a>
      <div className="rounded-lg bg-gray-100 p-3 space-y-2">
        <CarInfo
          label="Vehicule de Démo"
          value={entry.IsDemo ? "Oui" : "Non"}
        />
        <CarInfo label="Année" value={entry.Year.toString()} />
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

function buildOpenUrl(entry: InventoryEntry) {
  return `https://www.tesla.com/fr_FR/${entry.Model}/order/${entry.VIN}`;
}
