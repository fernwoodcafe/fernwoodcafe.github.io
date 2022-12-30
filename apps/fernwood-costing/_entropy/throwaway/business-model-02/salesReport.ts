import { pipable } from "./functional.ts";

export type ItemSales = {
  name: string;
  cost: number;
  price: number;
  unitSales: number;
};

export default (sales: ItemSales[]) => {
  const revenueCurrency = sales
    .map((x) => x.price * x.unitSales)
    .reduce((acc, next) => acc + next, 0);

  const cogsCurrency = sales
    .map((x) => x.cost * x.unitSales)
    .reduce((acc, next) => acc + next, 0);

  const cogsPercent = cogsCurrency / revenueCurrency;

  const averageMarkup = revenueCurrency / cogsCurrency;

  const grossProfitCurrency = revenueCurrency - cogsCurrency;

  return pipable({
    revenueCurrency,
    cogsCurrency,
    cogsPercent,
    averageMarkup,
    grossProfitCurrency,
  });
};
