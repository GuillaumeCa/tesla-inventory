"use client";

import { Model } from "app/lib/types/inventory";
import { useEffect, useState } from "react";
import { useDebounce, useUpdateSearchParams } from "../hooks";
import { cls } from "../utils";

const models = ["m3", "my", "ms", "mx"] as const;

export function Filters() {
  const { isParam, updateParam, params } = useUpdateSearchParams();
  const [code, setCode] = useState(params.get("code") || "");
  const debounceCode = useDebounce(code, 500);

  useEffect(() => {
    if (debounceCode.length >= 5) {
      updateParam("code", code);
      updateParam("selected", "");
    }
  }, [debounceCode]);

  return (
    <div className="flex gap-4 mb-4">
      <div className="bg-gray-200 text-gray-600 font-semibold rounded-lg inline-block">
        {models.map((m) => (
          <button
            key={m}
            className={cls(
              "rounded-md m-1 px-2 py-1",
              isParam("model", m) && "bg-white"
            )}
            onClick={() => {
              updateParam("model", m);
              updateParam("selected", "");
            }}
          >
            {Model[m]}
          </button>
        ))}
      </div>
      <div>
        <input
          className="p-2 ring-2 text-gray-600 ring-gray-200 rounded-lg"
          placeholder="Code postal"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
    </div>
  );
}
