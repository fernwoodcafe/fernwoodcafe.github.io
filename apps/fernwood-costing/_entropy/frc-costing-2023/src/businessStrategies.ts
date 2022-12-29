/**
 * The inputs represent the business strategy.
 */
const businessStrategy = {
  grossRevenueCurrency: 300_000,
  cogsPercent: 0.3,
  labourCostPercent: 0.5,
  labourWageCurrency: 21,
  labourShiftLengthHours: 8,
};

export default [businessStrategy];

export type BusinessStrategy = typeof businessStrategy;
