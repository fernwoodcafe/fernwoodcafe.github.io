import { BusinessResult } from "./businessResult.ts";
import { LabourStrategy } from "./labourStrategies.ts";

const labourAvailableHours = (
  result: BusinessResult,
  labourStrategy: LabourStrategy
) => result.labourCostCurrency / labourStrategy.labourWageCurrency;

const labourAvailableShiftsTotal = (
  businessResult: BusinessResult,
  labourStrategy: LabourStrategy
) =>
  labourAvailableHours(businessResult, labourStrategy) /
  labourStrategy.labourShiftLengthHours;

/**
 * The result of that strategy.
 */
const labourResultFuncs = {
  labourAvailableHours,
  labourAvailableShiftsTotal,
};

export default (
  businessResult: BusinessResult,
  labourStrategy: LabourStrategy
): BusinessResult =>
  Object.fromEntries(
    Object.entries(labourResultFuncs).map(([key, func]) => [
      key,
      func(businessResult, labourStrategy),
    ])
  ) as BusinessResult;

export type LabourResult = {
  [K in keyof typeof labourResultFuncs]: ReturnType<
    typeof labourResultFuncs[K]
  >;
};
