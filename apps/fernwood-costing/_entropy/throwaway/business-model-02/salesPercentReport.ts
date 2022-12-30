import { pipable } from "./functional.ts";
import { revenueCurrency } from "./salesGrossProfitReport.ts";
import { ItemSales } from "./ItemSales.ts";

export default (sales: ItemSales[]) => {
  const totalRevenue = revenueCurrency(sales);
  const report = sales.map((itemSales) => [
    itemSales.name + " Percent",
    (itemSales.price * itemSales.unitSales) / totalRevenue,
  ]);

  return pipable(Object.fromEntries(report));
};
