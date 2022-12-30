import { pipable, Pipable } from "./functional.ts";
import { ItemSales } from "./salesGrossProfitReport.ts";

/**
 * What if we _only_ sold these items? Then how would our model respond?
 * How about we model the Espresso Bar's top ten items this way? Put in the
 * expected 2023 cost, price, and unit sales.
 */
const items: Pipable<ItemSales[]> = pipable([
  {
    name: "latte 12 oz dairy",
    cost: 1.5,
    price: 4.5,
    unitSales: 40_000,
  },
  {
    name: "latte 16 oz dairy",
    cost: 2.0,
    price: 5.0,
    unitSales: 20_000,
  },
]);

export default items;
