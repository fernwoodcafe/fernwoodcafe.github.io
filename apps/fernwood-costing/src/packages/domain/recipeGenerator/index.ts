import espressoCostFor from './espressoCostFor';
import milkCostFor from './milkCostFor';
import packagingCostFor from './packagingCostFor';

type AvailableCupKinds = "for_here" | "to_go" | "own_cup";
type AvailableDrinkSizesInOunces = 8 | 12 | 16;
type AvailableEspressoShots = 2 | 4 | 6;
type AvailableMilkAlternatives =
  | "dairy_one_percent"
  | "dairy_3_percent"
  | "dairy_10_percent"
  | "oat"
  | "almond";

export type AvailableCustomerOptions = {
  availableSizesInOunces: readonly AvailableDrinkSizesInOunces[];
  availableExpressoShots: readonly AvailableEspressoShots[];
  availableMilkAlternatives: readonly AvailableMilkAlternatives[];
  availableCups: readonly AvailableCupKinds[];
};

export type RecipePermutation = {
  cupKind: AvailableCupKinds;
  drinkSizeOunces: AvailableDrinkSizesInOunces;
  espressoCostDollars: number;
  espressoFluidOunces: number;
  espressoGrams: number;
  espressoShots: AvailableEspressoShots;
  milkAlternative: AvailableMilkAlternatives;
  milkColdOunces: number;
  milkCostDollars: number;
  milkSteamedOunces: number;
  packagingCostDollars: number;
  totalCostDollars: number;
};

export const roundToTwoDecimalPlaces = (input: number) =>
  Math.round(input * 100) / 100;

/**
 * Currently this supports only lattes.
 *
 * TODO [work-ethic] Complete the latte 12 & 16 ounce before moving on to other drinks.
 *
 * TODO [design] Break the output into three related objects joined on the menu-item-id.
 * 1. **Menu Item Customer Options** This includes everything a custom can choose.
 * 2. **Menu Item Recipe** This includes ingredients (raw and cooked) and packaging.
 * 3. **Menu Item Cost** This includes the cost details and summary.
 */
export default (options: AvailableCustomerOptions): RecipePermutation[] =>
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
      totalCostDollars: roundToTwoDecimalPlaces(
        recipe.packagingCostDollars +
          recipe.espressoCostDollars +
          recipe.milkCostDollars
      ),
    }));
