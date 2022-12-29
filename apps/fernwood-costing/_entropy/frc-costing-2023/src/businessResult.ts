import type { BusinessStrategy } from "./businessStrategies.ts";

const cogsCurrency = (strategy: BusinessStrategy) =>
  strategy.expectedGrossRevenueCurrency * strategy.targetCogsPercent;

const labourCostCurrency = (strategy: BusinessStrategy) =>
  strategy.expectedGrossRevenueCurrency * strategy.targetLabourCostPercent;

const labourAvailableHours = (strategy: BusinessStrategy) =>
  labourCostCurrency(strategy) / strategy.targetLabourWageCurrency;

const labourAvailableShifts = (strategy: BusinessStrategy) =>
  labourAvailableHours(strategy) / strategy.labourShiftLengthHours;

const grossProfitCurrency = (strategy: BusinessStrategy) =>
  strategy.expectedGrossRevenueCurrency -
  cogsCurrency(strategy) -
  labourCostCurrency(strategy);

/**
 * The result of that strategy.
 */
const businessResultParts = [
  cogsCurrency,
  labourCostCurrency,
  labourAvailableHours,
  labourAvailableShifts,
  grossProfitCurrency,
];

export default (strategy: BusinessStrategy) =>
  Object.fromEntries(
    businessResultParts.map((func) => [func.name, func(strategy)])
  );

export type BusinessResult = (
  strategy: BusinessStrategy
) => Record<string, unknown>;
