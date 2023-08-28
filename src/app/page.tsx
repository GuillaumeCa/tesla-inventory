import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Filters } from "./_components/filters";
import {
  InventoryList,
  InventoryListLoader,
} from "./_components/inventory-list";

const query = {
  query: {
    model: "my",
    condition: "new",
    options: {},
    arrangeby: "Price",
    order: "asc",
    market: "FR",
    language: "fr",
    super_region: "north america",
    zip: "78220",
    range: 50,
    region: "FR",
  },
  offset: 0,
  count: 50,
  outsideOffset: 0,
  outsideSearch: false,
};

const defaults = {
  model: "my",
  code: "78220",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const newParams = new URLSearchParams(searchParams);

  if (Object.keys(defaults).some((d) => !newParams.has(d))) {
    Object.entries(defaults).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    redirect("?" + newParams.toString());
  }

  return (
    <main className="min-h-screen p-12">
      <h1 className="text-3xl font-bold mb-4">
        <Link href="/">Inventaire Tesla</Link>
      </h1>

      <Filters />

      <Suspense fallback={<InventoryListLoader />}>
        <InventoryList
          carSelected={newParams.has("selected")}
          query={{
            ...query,
            query: {
              ...query.query,
              model: newParams.get("model"),
              zip: newParams.get("code"),
            },
          }}
        />
      </Suspense>
    </main>
  );
}
