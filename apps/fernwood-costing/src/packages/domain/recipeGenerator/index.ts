import discountFor from './discountFor';
import espressoCostFor from './espressoCostFor';
import milkCostFor from './milkCostFor';
import packagingCostFor from './packagingCostFor';

export type AvailableCupKind = "for_here" | "to_go" | "own_cup";
export type AvailableDrinkSizesInOunces = 8 | 12 | 16;
export type AvailableEspressoShots = 2 | 4 | 6;
export type AvailableMilkAlternative =
  | "dairy_one_percent"
  | "dairy_3_percent"
  | "dairy_10_percent"
  | "oat"
  | "almond";

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

export type RecipePermutation = PricingOptions & {
  // recipe permutation
  cupKind: AvailableCupKind;
  drinkSizeOunces: AvailableDrinkSizesInOunces;
  espressoShots: AvailableEspressoShots;
  milkAlternative: AvailableMilkAlternative;
  // ingredients - raw
  espressoGrams: number;
  milkColdOunces: number;
  // ingredients - cooked
  espressoFluidOunces: number;
  milkSteamedOunces: number;
  // cost
  milkCostDollars: number;
  espressoCostDollars: number;
  ingredientCostDollars: number;
  packagingCostDollars: number;
  totalCostDollars: number;
  // price
  discountDollars: number;
  suggestedPrice: number;
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
export default (
  customerOptions: AvailableCustomerOptions,
  pricingOptions: PricingOptions
): RecipePermutation[] =>
  customerOptions.availableSizesInOunces
    .map((drinkSizeOunces) => ({
      drinkSizeOunces,
    }))
    .flatMap((recipe) =>
      customerOptions.availableCups.map((cupKind) => ({
        ...recipe,
        cupKind,
      }))
    )
    .flatMap((recipe) =>
      customerOptions.availableExpressoShots.map((espressoShots) => ({
        ...recipe,
        espressoShots,
      }))
    )
    .flatMap((recipe) =>
      customerOptions.availableMilkAlternatives.map((milkAlternative) => ({
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
    .map(recipe => ({
      ...recipe,
      ...discountFor(recipe)
    }))
    .map((recipe) => ({
      ...recipe,
      ingredientCostDollars: roundToTwoDecimalPlaces(
          recipe.espressoCostDollars +
          recipe.milkCostDollars
      ),
      totalCostDollars: roundToTwoDecimalPlaces(
        recipe.packagingCostDollars +
          recipe.espressoCostDollars +
          recipe.milkCostDollars
      ),
    }))
    .map(recipe => ({
      ...recipe,
      ...pricingOptions,
    }))
    .map(recipe => ({
      ...recipe,
      suggestedPrice: roundToTwoDecimalPlaces(
        recipe.ingredientCostDollars * pricingOptions.ingredientMarkup +
        recipe.packagingCostDollars * pricingOptions.packagingMarkup -
        recipe.discountDollars
      )
    }));
