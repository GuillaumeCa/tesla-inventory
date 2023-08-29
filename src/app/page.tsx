import { RedirectType } from "next/dist/client/components/redirect";
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

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  if (Object.keys(defaults).some((d) => !searchParams[d])) {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(defaults).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    redirect("?" + newParams.toString(), RedirectType.replace);
  }

  return (
    <main className="min-h-screen p-12">
      <h1 className="text-3xl font-bold mb-4">
        <Link href="/">Inventaire Tesla</Link>
      </h1>

      <Filters />

      <Suspense fallback={<InventoryListLoader />}>
        <InventoryList
          carSelectedId={searchParams["selected"]}
          query={{
            ...query,
            query: {
              ...query.query,
              model: searchParams["model"],
              zip: searchParams["code"],
            },
          }}
        />
      </Suspense>
    </main>
  );
}
