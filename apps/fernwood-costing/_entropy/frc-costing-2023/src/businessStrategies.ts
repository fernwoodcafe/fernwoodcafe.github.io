/**
 * The inputs represent the business strategy and its projections.
 */
const businessStrategy = {
  grossRevenueCurrency: 291_000,
  cogsPercent: 0.3,
  labourCostPercent: 0.5,
};

export default [businessStrategy];

export type BusinessStrategy = typeof businessStrategy;
