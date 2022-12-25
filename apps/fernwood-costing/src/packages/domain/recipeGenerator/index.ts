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

const milkCostFor = (recipe: RecipeVariant) => ({
  milkSteamedOunces: 10.5,
  milkColdOunces: 8.5,
  milkCostDollars: 0.42,
});

const espressoCostFor = (recipe: RecipeVariant) => ({
  espressoGrams: 18.5 * (recipe.espressoShots / 2),
  espressoFluidOunces: 1.5 * (recipe.espressoShots / 2),
  espressoCostDollars: 0.57 * (recipe.espressoShots / 2),
});

const packagingCostFor = (recipe: RecipeVariant) => {
  if (recipe.cupKind !== "to_go") {
    return 0;
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
        recipe.packagingCostDollars + recipe.espressoCostDollars,
    }));
