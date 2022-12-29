/**
 * The inputs represent the business strategy and its projections.
 */
const businessStrategy = {
  grossRevenueCurrency: 325_000,
  cogsPercent: 0.3,
  postCogsLabourCostPercent: 0.65,
  // TODO [must-have] Model the _total_ for overhead like rent, electricity...
};

export default [businessStrategy];

export type BusinessStrategy = typeof businessStrategy;
