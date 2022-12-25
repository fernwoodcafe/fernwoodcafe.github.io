type AvailableCups = readonly ("for_here" | "to_go" | "own_cup")[];
type AvailableSizesInOunces = readonly (8 | 12 | 16)[];
type AvailableEspressoShots = readonly (2 | 4 | 6)[];
type AvailableMilkAlternatives = readonly (
  | "dairy_one_percent"
  | "dairy_3_percent"
  | "dairy_10_percent"
  | "oat"
  | "almond"
)[];

export type RecipeOptions = {
  availableSizesInOunces: AvailableSizesInOunces;
  availableExpressoShots: AvailableEspressoShots;
  availableMilkAlternatives: AvailableMilkAlternatives;
  availableCups: AvailableCups;
};

export default (options: RecipeOptions) =>
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
      options.availableExpressoShots.map((shots) => ({
        ...accumulator,
        shots,
      }))
    )
    .flatMap((accumulator) =>
      options.availableMilkAlternatives.map((milk) => ({
        ...accumulator,
        milk,
      }))
    );
