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
  }).map(([key, value]) => [key, value.toFixed(2).padStart(10, " ")])
);

console.table(report);
