import type { AvailableCustomerOptions, PricingOptions } from '..';

export type CostingData = {
  packagingForHotDrinkSizeInOunces: Map<number, string[]>;
  costForPackaging: Map<string, number>;
  customerOptions:AvailableCustomerOptions;
  pricingOptions: PricingOptions;
};
