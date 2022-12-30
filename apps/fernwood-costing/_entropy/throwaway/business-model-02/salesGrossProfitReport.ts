import { pipable } from "./functional.ts";
import { ItemSales } from "./ItemSales.ts";

export const revenueCurrency = (sales: ItemSales[]) =>
  sales.map((x) => x.price * x.unitSales).reduce((acc, next) => acc + next, 0);

export default (sales: ItemSales[]) => {
  const cogsCurrency = sales
    .map((x) => x.cost * x.unitSales)
    .reduce((acc, next) => acc + next, 0);

  const cogsPercent = cogsCurrency / revenueCurrency(sales);

  const averageMarkup = revenueCurrency(sales) / cogsCurrency;

  const grossProfitCurrency = revenueCurrency(sales) - cogsCurrency;

  return pipable({
    revenueCurrency: revenueCurrency(sales),
    cogsCurrency,
    cogsPercent,
    averageMarkup,
    grossProfitCurrency,
  });
};
