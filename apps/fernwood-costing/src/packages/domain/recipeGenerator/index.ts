export type AvailableSizesInOunces = readonly (8 | 12 | 16)[];
export type AvailableEspressoShots = readonly (2 | 4 | 6)[];

export type RecipeOptions = {
  availableSizesInOunces: AvailableSizesInOunces;
  availableExpressoShots: AvailableEspressoShots;
};

export default (options: RecipeOptions) => {
  return options.availableSizesInOunces
    .map((size) => ({
      size,
    }))
    .map((withSize) =>
      options.availableExpressoShots.map((shots) =>
        ({
          ...withSize,
          shots,
        })
      )
    )
    .flat();
};
