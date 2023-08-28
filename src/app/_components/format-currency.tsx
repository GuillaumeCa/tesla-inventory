"use client";

const formatter = new Intl.NumberFormat("fr", { currency: "EUR" });

export function FormatCurrency({ value }: { value: number }) {
  return formatter.format(value);
}
