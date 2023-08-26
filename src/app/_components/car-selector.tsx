"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CarSelector({ id }: { id: string }) {
  const queryParams = useSearchParams();
  const selected = queryParams.get("selected") === id;

  function getSearchParam(idSelected: string) {
    const newSearch = new URLSearchParams(queryParams);
    newSearch.set("selected", idSelected);
    return newSearch.toString();
  }

  return (
    <div
      className={`absolute bottom-0 left-0 w-full p-3 mt-auto ${
        selected ? "" : "hidden group-hover:block"
      }`}
    >
      <Link
        href={"?" + getSearchParam(id)}
        scroll={false}
        className={`w-full text-center block mt-2 px-3 py-2 font-semibold ${
          selected ? "bg-blue-600 text-white" : "text-gray-700 bg-gray-200"
        } hover:bg-blue-600 hover:text-white rounded`}
      >
        {selected ? "Selectionné" : "Selectionner"}
      </Link>
    </div>
  );
}
