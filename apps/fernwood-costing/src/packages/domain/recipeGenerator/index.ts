type AvailableCups = "for_here" | "to_go" | "own_cup";
type AvailableSizesInOunces = 8 | 12 | 16;
type AvailableEspressoShots = 2 | 4 | 6;
type AvailableMilkAlternatives =
  | "dairy_one_percent"
  | "dairy_3_percent"
  | "dairy_10_percent"
  | "oat"
  | "almond";

export type CustomerOptions = {
  availableSizesInOunces: readonly AvailableSizesInOunces[];
  availableExpressoShots: readonly AvailableEspressoShots[];
  availableMilkAlternatives: readonly AvailableMilkAlternatives[];
  availableCups: readonly AvailableCups[];
};

export type RecipeVariant = {
  size: AvailableSizesInOunces;
  cup: AvailableCups;
  espressoShots: AvailableEspressoShots;
  milkAlternative: AvailableMilkAlternatives;
};

export default (options: CustomerOptions): RecipeVariant[] =>
  options.availableSizesInOunces
    .map((size) => ({
      size,
    }))
    .flatMap((accumulator) =>
      options.availableCups.map((cup) => ({
        ...accumulator,
        cup,
      }))
    )
    .flatMap((accumulator) =>
      options.availableExpressoShots.map((espressoShots) => ({
        ...accumulator,
        espressoShots,
        espressoGrams: (18.5 * (espressoShots / 2)),
        espressoFluidOunces: (1.5 * (espressoShots / 2)),
        espressoCostDollars: (0.57 * (espressoShots / 2)),
      }))
    )
    .flatMap((accumulator) =>
      options.availableMilkAlternatives.map((milkAlternative) => ({
        ...accumulator,
        milkAlternative,
      }))
    );
