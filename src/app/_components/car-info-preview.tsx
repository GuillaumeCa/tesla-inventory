import {
  FactoryCode,
  InventoryEntry,
  Model,
  Trim,
} from "app/lib/types/inventory";

export function CarInfoPreview({ entry }: { entry: InventoryEntry }) {
  return (
    <>
      <h2 className="font-bold text-lg">
        {Model[entry.Model]} {Trim[entry.TRIM?.[0]]}
      </h2>
      <div className="flex justify-between">
        <p className="text-gray-700 text-lg">
          {entry.InventoryPrice}€{" "}
          <span className="text-gray-400 text-base line-through">
            {entry.PurchasePrice + entry.Discount}€
          </span>
        </p>
        <p className="uppercase text-sm font-semibold text-gray-500">
          {FactoryCode[entry.FactoryCode]}
        </p>
      </div>
      <div className="relative">
        {/* <PlaceholderImage /> */}
        <img
          className="relative"
          loading="lazy"
          src={formatUrl(entry.Model, entry.OptionCodeList)}
        />
      </div>
    </>
  );
}

function formatUrl(model: keyof typeof Model, options: string) {
  return `https://static-assets.tesla.com/configurator/compositor?&bkba_opt=1&view=STUD_3QTR&size=1400&model=${model}&options=${options}&crop=1400,850,300,130&`;
}
