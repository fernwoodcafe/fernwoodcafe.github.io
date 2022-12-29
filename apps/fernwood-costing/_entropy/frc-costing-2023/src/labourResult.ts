import { BusinessResult } from "./businessResult.ts";
import { LabourStrategy } from "./labourStrategies.ts";

const totalAvailableHours = (
  result: BusinessResult,
  labourStrategy: LabourStrategy
) => result.labourCostCurrency / labourStrategy.labourWageCurrency;

const totalAvailableShifts = (
  businessResult: BusinessResult,
  labourStrategy: LabourStrategy
) =>
  totalAvailableHours(businessResult, labourStrategy) /
  labourStrategy.labourShiftLengthHours;

/**
 * The result of that strategy.
 */
const labourResultFuncs = {
  totalAvailableHours,
  totalAvailableShifts,
};

export default (
  businessResult: BusinessResult,
  labourStrategy: LabourStrategy
): LabourResult =>
  Object.fromEntries(
    Object.entries(labourResultFuncs).map(([key, func]) => [
      key,
      func(businessResult, labourStrategy),
    ])
  ) as LabourResult;

export type LabourResult = {
  [K in keyof typeof labourResultFuncs]: ReturnType<
    typeof labourResultFuncs[K]
  >;
};
