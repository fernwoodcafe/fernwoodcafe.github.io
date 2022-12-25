type AvailableCupKinds = "for_here" | "to_go" | "own_cup";
type AvailableCupSizesInOunces = 8 | 12 | 16;
type AvailableEspressoShots = 2 | 4 | 6;
type AvailableMilkAlternatives =
  | "dairy_one_percent"
  | "dairy_3_percent"
  | "dairy_10_percent"
  | "oat"
  | "almond";

export type CustomerOptions = {
  availableSizesInOunces: readonly AvailableCupSizesInOunces[];
  availableExpressoShots: readonly AvailableEspressoShots[];
  availableMilkAlternatives: readonly AvailableMilkAlternatives[];
  availableCups: readonly AvailableCupKinds[];
};

export type RecipeVariant = {
  cupSizeOunces: AvailableCupSizesInOunces;
  cupKind: AvailableCupKinds;
  espressoShots: AvailableEspressoShots;
  milkAlternative: AvailableMilkAlternatives;
};

const packagingCostFor = (
  options: Pick<RecipeVariant, "cupKind" | "cupSizeOunces">
) => {
  if (options.cupKind !== "to_go") {
    return 0;
  }

  // cup + lid + sleeve
  switch (options.cupSizeOunces) {
    case 8:
      // Note: We currently do not have 8 ounce sleeves;
      // people tend not to ask for them.
      return Math.round((0.13 + 0.12 + 0.00) * 100) / 100;
    case 12:
      return Math.round((0.17 + 0.13 + 0.08)* 100) / 100;
    case 16:
      return Math.round((0.19 + 0.13 + 0.08) * 100) / 100;
  }
};

export default (options: CustomerOptions): RecipeVariant[] =>
  options.availableSizesInOunces
    .map((cupSizeOunces) => ({
      cupSizeOunces,
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
      // TODO [refactor] Clean up these formulas.
      espressoGrams: 18.5 * (recipe.espressoShots / 2),
      espressoFluidOunces: 1.5 * (recipe.espressoShots / 2),
      espressoCostDollars: 0.57 * (recipe.espressoShots / 2),
      packagingCostDollars: packagingCostFor(recipe),
    }));
