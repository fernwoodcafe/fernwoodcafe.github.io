import type { BusinessStrategy } from "./businessStrategy.ts";

const cogsCurrency = (strategy: BusinessStrategy) =>
  strategy.grossRevenueCurrency * strategy.cogsPercent;
const labourCostCurrency = (strategy: BusinessStrategy) =>
  strategy.grossRevenueCurrency * strategy.labourCostPercent;
const grossProfitCurrency = (strategy: BusinessStrategy) =>
  strategy.grossRevenueCurrency -
  cogsCurrency(strategy) -
  labourCostCurrency(strategy);

/**
 * The result of that strategy.
 */
const businessResultParts = [
  cogsCurrency,
  labourCostCurrency,
  grossProfitCurrency,
];

export default (strategy: BusinessStrategy) =>
  Object.fromEntries(
    businessResultParts.map((func) => [func.name, func(strategy)])
  );

export type BusinessResult = (
  strategy: BusinessStrategy
) => Record<string, unknown>;
