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

        return [key, value.toString()];
      })
      .map(([key, value]) => [key, value.padStart(10, " ").padEnd(13, " ")])
  );

  console.table(report);
};
