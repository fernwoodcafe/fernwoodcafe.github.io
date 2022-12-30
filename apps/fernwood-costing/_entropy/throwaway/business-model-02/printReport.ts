import { round } from "https://deno.land/x/math@v1.1.0/mod.ts";
import currency from "npm:currency.js";

export default (reportRecord: Record<string, number>) => {
  const report = Object.fromEntries(
    Object.entries(reportRecord)
      .map(([key, value]) => {
        if (/Currency/.test(key)) {
          return [key, currency(value).format()];
        }

        if (/Percent/.test(key)) {
          return [key, `${round(value * 100)}%`];
        }

        return [key, value.toFixed(2)];
      })
      .map(([key, value]) => [key, value.padStart(15, " ").padEnd(20, " ")])
  );

  console.table(report);
};
