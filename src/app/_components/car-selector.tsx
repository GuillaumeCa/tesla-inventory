"use client";

import { useUpdateSearchParams } from "../hooks";

export function CarSelector({ id }: { id: string }) {
  const { updateParam, isParam } = useUpdateSearchParams();
  const selected = isParam("selected", id);

  return (
    <div
      className={`absolute bottom-0 left-0 w-full p-3 mt-auto ${
        selected ? "" : "hidden group-hover:block"
      }`}
    >
      <button
        className={`w-full group/link text-center block mt-2 px-3 py-2 font-semibold ${
          selected
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "text-gray-200 hover:bg-blue-600 bg-gray-500"
        } hover:text-white rounded`}
        onClick={() => {
          updateParam("selected", selected ? "" : id, false);
        }}
      >
        <span className="group-hover/link:hidden">
          {selected ? "Selectionné" : "Selectionner"}
        </span>
        <span className="hidden group-hover/link:inline">
          {selected ? "Déselectionner" : "Selectionner"}
        </span>
      </button>
    </div>
  );
}
