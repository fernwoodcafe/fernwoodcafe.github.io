import type { BusinessStrategy } from "./businessStrategies.ts";

const cogsCurrency = (strategy: BusinessStrategy) =>
  strategy.grossRevenueCurrency * strategy.cogsPercent;
const labourCostCurrency = (strategy: BusinessStrategy) =>
  strategy.grossRevenueCurrency * strategy.labourCostPercent;
const grossProfitCurrency = (strategy: BusinessStrategy) =>
  strategy.grossRevenueCurrency -
  cogsCurrency(strategy) -
  labourCostCurrency(strategy);

const labourAvailableHours = (strategy: BusinessStrategy) =>
  labourCostCurrency(strategy) / strategy.labourWageCurrency;

const labourAvailableShifts = (strategy: BusinessStrategy) =>
  labourAvailableHours(strategy) / strategy.labourShiftLengthHours;

/**
 * The result of that strategy.
 */
const businessResultParts = [
  cogsCurrency,
  labourCostCurrency,
  grossProfitCurrency,
  labourAvailableHours,
  labourAvailableShifts,
];

export default (strategy: BusinessStrategy) =>
  Object.fromEntries(
    businessResultParts.map((func) => [func.name, func(strategy)])
  );

export type BusinessResult = (
  strategy: BusinessStrategy
) => Record<string, unknown>;
