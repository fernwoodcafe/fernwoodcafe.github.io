import type { AvailableCustomerOptions, PricingOptions } from '..';

export type CostingData = {
  packagingForHotDrinkSizeInOunces: Map<number, string[]>;
  costForPackaging: Map<string, number>;
  costForIngredient: Map<string, number>;
  steamedMilkFromColdMilkForLatte: Map<number, number>;
  discounts: Map<string, number>;
  customerOptions:AvailableCustomerOptions;
  pricingOptions: PricingOptions;
};
