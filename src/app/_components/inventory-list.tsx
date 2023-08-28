import { searchInventory } from "app/lib/tesla-api";
import { cls } from "../utils";
import { CarInfoPreview } from "./car-info-preview";
import { CarSelector } from "./car-selector";
import { SelectedCar } from "./selected-car";

const hiddenOpts = [
  "$DV2W",
  "$PRMY1",
  "$SC04",
  "$MDLY",
  "$MTY13",
  "$MTY09",
  "$CPF0",
  "$WY19B",
];

export async function InventoryList({
  query,
  carSelected,
}: {
  query: any;
  carSelected: boolean;
}) {
  const inventory = await searchInventory(query);

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        {inventory.length === 0 && (
          <p className="text-gray-500">
            Aucune modèle disponible actuellement.
          </p>
        )}
        <ul
          className={cls(
            "grid gap-4",
            carSelected ? "grid-cols-2" : "grid-cols-3"
          )}
        >
          {inventory.map((entry) => (
            <li
              className="group relative p-3 flex flex-col rounded-lg bg-gray-100"
              key={entry.Hash}
            >
              <CarInfoPreview entry={entry} />
              <ul className="list-disc pl-4 text-gray-600">
                {entry.OptionCodeData.filter(
                  (d) => !hiddenOpts.includes(d.code) && Boolean(d.description)
                ).map((d) => (
                  <li>{d.description}</li>
                ))}
              </ul>
              <CarSelector id={entry.Hash} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SelectedCar inventory={inventory} />
      </div>
    </div>
  );
}

export function InventoryListLoader() {
  const items = new Array(12).fill(null).map((e, i) => i);
  return (
    <ul className="grid grid-cols-3 gap-4">
      {items.map((e) => (
        <li
          key={e}
          className="p-4 rounded-lg w-full h-[300px] space-y-2 bg-gray-100 animate-pulse"
          style={{
            animationDelay: 400 * e + "ms",
          }}
        >
          <div className="w-52 h-6 rounded bg-gray-300"></div>
          <div className="w-32 h-6 rounded bg-gray-300"></div>
        </li>
      ))}
    </ul>
  );
}
