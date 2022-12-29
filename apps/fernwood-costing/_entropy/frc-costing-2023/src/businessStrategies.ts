/**
 * The inputs represent the business strategy and its projections.
 */
const businessStrategy = {
  grossRevenueCurrency: 291_000,
  cogsPercent: 0.3,
  postCogsLabourCostPercent: 0.8,
};

export default [businessStrategy];

export type BusinessStrategy = typeof businessStrategy;
