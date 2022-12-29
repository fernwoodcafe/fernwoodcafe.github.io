import { BusinessResult } from "./businessResult.ts";
import { LabourStrategy } from "./labourStrategies.ts";

const weeksPerMonth = 4;

const totalAvailableHours = (
  result: BusinessResult,
  labourStrategy: LabourStrategy
) => result.labourBudgetCurrency / labourStrategy.labourWageCurrency;

const totalAvailableShifts = (
  businessResult: BusinessResult,
  labourStrategy: LabourStrategy
) =>
  totalAvailableHours(businessResult, labourStrategy) /
  labourStrategy.labourShiftLengthHours;

const calculateShifts = (
  months: string[],
  weeksClosed: number,
  daysOpenPerWeek: number,
  shiftsPerDay: number
) => {
  const openWeeks = weeksPerMonth * months.length - weeksClosed;
  const openDays = openWeeks * daysOpenPerWeek;
  const shifts = openDays * shiftsPerDay;
  return shifts;
};

const lowSeasonRequiredShifts = (_: unknown, s: LabourStrategy) =>
  calculateShifts(
    s.lowSeasonMonths,
    s.lowSeasonWeeksClosed,
    s.lowSeasonDaysPerWeek,
    s.lowSeasonShiftsPerDay
  );

const shoulderSeasonRequiredShifts = (_: unknown, s: LabourStrategy) =>
  calculateShifts(
    s.shoulderSeasonMonths,
    s.shoulderSeasonWeeksClosed,
    s.shoulderSeasonDaysPerWeek,
    s.shoulderSeasonShiftsPerDay
  );

const highSeasonRequiredShifts = (_: unknown, s: LabourStrategy) =>
  calculateShifts(
    s.highSeasonMonths,
    s.highSeasonWeeksClosed,
    s.highSeasonDaysPerWeek,
    s.highSeasonShiftsPerDay
  );

const shiftBalance = (result: BusinessResult, labourStrategy: LabourStrategy) =>
  totalAvailableShifts(result, labourStrategy) -
  highSeasonRequiredShifts(result, labourStrategy) -
  shoulderSeasonRequiredShifts(result, labourStrategy) -
  lowSeasonRequiredShifts(result, labourStrategy);

/**
 * The result of that strategy.
 */
const labourResultFuncs = {
  totalAvailableHours,
  totalAvailableShifts,
  lowSeasonRequiredShifts,
  shoulderSeasonRequiredShifts,
  highSeasonRequiredShifts,
  shiftBalance,
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
