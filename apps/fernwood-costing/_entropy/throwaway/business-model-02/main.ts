import { round } from "https://deno.land/x/math@v1.1.0/mod.ts";
import currency from "npm:currency.js";

type ItemSales = {
  name: string;
  cost: number;
  price: number;
  unitSales: number;
};

const allItemSales: ItemSales[] = [
  {
    name: "latte 12 oz",
    cost: 1,
    price: 3.5,
    unitSales: 100,
  },
  {
    name: "latte 16 oz",
    cost: 1,
    price: 3.5,
    unitSales: 50,
  },
];

const revenueCurrency = allItemSales
  .map((x) => x.price * x.unitSales)
  .reduce((acc, next) => acc + next, 0);

const cogsCurrency = allItemSales
  .map((x) => x.cost * x.unitSales)
  .reduce((acc, next) => acc + next, 0);

const cogsPercent = cogsCurrency / revenueCurrency;

const averageMarkup = revenueCurrency / cogsCurrency;

const grossProfitCurrency = revenueCurrency - cogsCurrency;

const report = Object.fromEntries(
  Object.entries({
    revenueCurrency,
    cogsCurrency,
    cogsPercent,
    averageMarkup,
    grossProfitCurrency,
  })
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
