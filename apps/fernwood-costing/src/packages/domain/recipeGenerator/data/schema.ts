export type PackagingOption =
  | "cup @ 8 oz"
  | "cup @ 12 oz"
  | "cup @ 16 oz"
  | "lid @ 8 oz"
  | "lid @ 10 to 20 oz"
  | "sleeve @ 12 to 20 oz";

export type AvailableCustomerOptions = {
  availableSizesInOunces: readonly AvailableDrinkSizesInOunces[];
  availableExpressoShots: readonly AvailableEspressoShots[];
  availableMilkAlternatives: readonly AvailableMilkAlternative[];
  availableCups: readonly AvailableCupKind[];
};

export type PricingOptions = {
  packagingMarkup: number;
  ingredientMarkup: number;
}

export type AvailableMilkAlternative =
  | "dairy_one_percent"
  | "dairy_3_percent"
  | "dairy_10_percent"
  | "oat"
  | "almond";

export type AvailableCupKind = "for_here" | "to_go" | "own_cup";

export type AvailableDrinkSizesInOunces = 8 | 12 | 16;

export type AvailableEspressoShots = 2 | 4 | 6;

export type EspressoCosting = {
  gramsPerShot: number;
  ouncesPerShot: number;
  costPerGram: number;
};

export type CostingData = {
  packagingForHotDrinkSizeInOunces: Map<number, string[]>;
  costForPackaging: Map<string, number>;
  costForIngredient: Map<string, number>;
  espressoCosting: EspressoCosting;
  steamedMilkFromColdMilkForLatte: Map<number, number>;
  discounts: Map<string, number>;
  customerOptions:AvailableCustomerOptions;
  pricingOptions: PricingOptions;
};
