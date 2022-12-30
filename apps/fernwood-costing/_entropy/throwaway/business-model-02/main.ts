import { Pipable, pipable } from "./functional.ts";
import printReport from "./printReport.ts";
import salesReport, { type ItemSales } from "./salesReport.ts";

const allItemSales: Pipable<ItemSales[]> = pipable([
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
]);

allItemSales.pipeInto(salesReport).pipeInto(printReport);
