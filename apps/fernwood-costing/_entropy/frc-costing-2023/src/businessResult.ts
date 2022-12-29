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
const businessResultFuncs = {
  cogsCurrency,
  labourCostCurrency,
  grossProfitCurrency,
  labourAvailableHours,
  labourAvailableShifts,
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
