type AvailableCupKinds = "for_here" | "to_go" | "own_cup";
type AvailableDrinkSizesInOunces = 8 | 12 | 16;
type AvailableEspressoShots = 2 | 4 | 6;
type AvailableMilkAlternatives =
  | "dairy_one_percent"
  | "dairy_3_percent"
  | "dairy_10_percent"
  | "oat"
  | "almond";

export type CustomerOptions = {
  availableSizesInOunces: readonly AvailableDrinkSizesInOunces[];
  availableExpressoShots: readonly AvailableEspressoShots[];
  availableMilkAlternatives: readonly AvailableMilkAlternatives[];
  availableCups: readonly AvailableCupKinds[];
};

export type RecipeVariant = {
  drinkSizeOunces: AvailableDrinkSizesInOunces;
  cupKind: AvailableCupKinds;
  espressoShots: AvailableEspressoShots;
  milkAlternative: AvailableMilkAlternatives;
  espressoGrams?: number;
  espressoFluidOunces?: number;
  espressoCostDollars?: number;
};

const milkCostFor = (recipe: RecipeVariant) => {
  const latteMilkSteamedToColdRatio = new Map<number, number>([
    [9, 7],
    [10.5, 8.5],
    [13, 9.5],
    [14.5, 11],
  ]);

  const dairy_3_percent_cost_per_ounce = 0.05;

  const milkSteamedOunces = recipe.drinkSizeOunces - recipe.espressoFluidOunces;
  const milkColdOunces = latteMilkSteamedToColdRatio.get(milkSteamedOunces);
  const milkCostDollars = Math.round(milkColdOunces * dairy_3_percent_cost_per_ounce * 100) / 100;
  return {
    milkSteamedOunces,
    milkColdOunces,
    milkCostDollars,
  };
};

const espressoCostFor = (recipe: RecipeVariant) => ({
  espressoGrams: 18.5 * (recipe.espressoShots / 2),
  espressoFluidOunces: 1.5 * (recipe.espressoShots / 2),
  espressoCostDollars: 0.57 * (recipe.espressoShots / 2),
});

const packagingCostFor = (recipe: RecipeVariant) => {
  if (recipe.cupKind !== "to_go") {
      return {
        packagingCostDollars: 0
      };
  }

  // cup + lid + sleeve
  switch (recipe.drinkSizeOunces) {
    case 8:
      // Note: We currently do not have 8 ounce sleeves;
      // people tend not to ask for them.
      return {
        packagingCostDollars: Math.round((0.13 + 0.12 + 0.0) * 100) / 100,
      };
    case 12:
      return {
        packagingCostDollars: Math.round((0.17 + 0.13 + 0.08) * 100) / 100,
      };
    case 16:
      return {
        packagingCostDollars: Math.round((0.19 + 0.13 + 0.08) * 100) / 100,
      };
  }
};

export default (options: CustomerOptions): RecipeVariant[] =>
  options.availableSizesInOunces
    .map((drinkSizeOunces) => ({
      drinkSizeOunces,
    }))
    .flatMap((recipe) =>
      options.availableCups.map((cupKind) => ({
        ...recipe,
        cupKind,
      }))
    )
    .flatMap((recipe) =>
      options.availableExpressoShots.map((espressoShots) => ({
        ...recipe,
        espressoShots,
      }))
    )
    .flatMap((recipe) =>
      options.availableMilkAlternatives.map((milkAlternative) => ({
        ...recipe,
        milkAlternative,
      }))
    )
    .map((recipe) => ({
      ...recipe,
      ...espressoCostFor(recipe),
      ...packagingCostFor(recipe),
    }))
    .map((recipe) => ({
      ...recipe,
      ...milkCostFor(recipe),
    }))
    .map((recipe) => ({
      ...recipe,
      totalCostDollars:
        Math.round((recipe.packagingCostDollars + recipe.espressoCostDollars + recipe.milkCostDollars) * 100) / 100,
    }));
