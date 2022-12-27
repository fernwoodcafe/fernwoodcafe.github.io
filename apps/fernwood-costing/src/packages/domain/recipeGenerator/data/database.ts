import type { AvailableCustomerOptions, CostingData, PackagingOption, PricingOptions } from "./schema";

const costForPackaging = new Map<PackagingOption, number>([
  ["cup @ 8 oz", 0.13],
  ["cup @ 12 oz", 0.17],
  ["cup @ 16 oz", 0.19],
  ["lid @ 8 oz", 0.12],
  ["lid @ 10 to 20 oz", 0.13],
  ["sleeve @ 12 to 20 oz", 0.08],
]);

const packagingForHotDrinkSizeInOunces = new Map<number, PackagingOption[]>([
  [8, ["cup @ 8 oz", "lid @ 8 oz"]],
  [12, ["cup @ 12 oz", "lid @ 10 to 20 oz", "sleeve @ 12 to 20 oz"]],
  [16, ["cup @ 16 oz", "lid @ 10 to 20 oz", "sleeve @ 12 to 20 oz"]],
]);

const customerOptions: AvailableCustomerOptions = {
  availableSizesInOunces: [12],
  availableExpressoShots: [2],
  availableMilkAlternatives: ["dairy_3_percent"],
  availableCups: ["to_go", "own_cup", "for_here"],
};

const pricingOptions: PricingOptions = {
  ingredientMarkup: 4.5,
  packagingMarkup: 1.5
};

const steamedMilkFromColdMilkForLatte = new Map<number, number>([
  [9, 7],
  [10.5, 8.5],
  [13, 9.5],
  [14.5, 11],
]);

const costForIngredient = new Map<string, number>([
  ["dairy_3_percent_cost_per_ounce", 0.05]
]);

const discounts = new Map<string, number>([["own_cup", 0.50]]);

const espressoCosting = {
  gramsPerShot: 18.5 / 2,
  ouncesPerShot: 1.5 / 2,
  costPerGram: 0.031
};

const database: CostingData = {
  costForPackaging,
  costForIngredient,
  packagingForHotDrinkSizeInOunces,
  customerOptions,
  pricingOptions,
  discounts,
  steamedMilkFromColdMilkForLatte,
  espressoCosting,
};

export default database;
