import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useUpdateSearchParams() {
  const params = useSearchParams();
  const router = useRouter();
  const newParams = new URLSearchParams(params);

  function updateParam(key: string, value: string, scroll = true) {
    newParams.set(key, value);
    if (value === "") {
      newParams.delete(key);
    }
    router.push("?" + newParams.toString(), {
      scroll,
    });
  }

  function isParam(key: string, value: string) {
    return newParams.get(key) === value;
  }

  return {
    updateParam,
    isParam,
    params: newParams,
  };
}
