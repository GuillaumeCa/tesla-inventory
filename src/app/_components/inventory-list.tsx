import { searchInventory } from "app/lib/tesla-api";
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

export async function InventoryList({ query }: { query: any }) {
  const inventory = await searchInventory(query);

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        {inventory.length === 0 && (
          <p>Aucune modèle disponible actuellement.</p>
        )}
        <ul className="grid grid-cols-3 gap-4">
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

function PlaceholderImage() {
  return (
    <img
      className="w-full blur-md"
      src="data:image/jpeg;base64,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"
    />
  );
}
