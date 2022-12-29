import type { BusinessStrategy } from "./businessStrategies.ts";

const cogsCurrency = (strategy: BusinessStrategy) =>
  strategy.grossRevenueCurrency * strategy.cogsPercent;

const labourBudgetCurrency = (strategy: BusinessStrategy) =>
  (strategy.grossRevenueCurrency - cogsCurrency(strategy)) *
  strategy.postCogsLabourCostPercent;

const grossProfitCurrency = (strategy: BusinessStrategy) =>
  strategy.grossRevenueCurrency -
  cogsCurrency(strategy) -
  labourBudgetCurrency(strategy);

/**
 * The result of that strategy.
 */
const businessResultFuncs = {
  cogsCurrency,
  labourBudgetCurrency,
  grossProfitCurrency,
};

export default (strategy: BusinessStrategy): BusinessResult =>
  Object.fromEntries(
    Object.entries(businessResultFuncs).map(([key, func]) => [
      key,
      func(strategy),
    ])
  ) as BusinessResult;

export type BusinessResult = {
  [K in keyof typeof businessResultFuncs]: ReturnType<
    typeof businessResultFuncs[K]
  >;
};
