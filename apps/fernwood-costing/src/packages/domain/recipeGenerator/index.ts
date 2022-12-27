import { roundToTwoDecimalPlaces } from '../math/roundToDecimalPlaces';
import type { CostingData } from './data/schema';
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
  suggestedIngredientsPrice: number;
  suggestedPackagingPrice: number;
  suggestedPrice: number;
};

/**
 * Currently this supports only lattes.
 *
 * TODO [work-ethic] Complete the latte 12 & 16 ounce before moving on to other drinks.
 */
export default (
  costingData: CostingData
): RecipePermutation[] =>
  costingData.customerOptions.availableSizesInOunces
    .map((drinkSizeOunces) => ({
      drinkSizeOunces,
    }))
    .flatMap((recipe) =>
      costingData.customerOptions.availableCups.map((cupKind) => ({
        ...recipe,
        cupKind,
      }))
    )
    .flatMap((recipe) =>
      costingData.customerOptions.availableExpressoShots.map((espressoShots) => ({
        ...recipe,
        espressoShots,
      }))
    )
    .flatMap((recipe) =>
      costingData.customerOptions.availableMilkAlternatives.map((milkAlternative) => ({
        ...recipe,
        milkAlternative,
      }))
    )
    .map((recipe) => ({
      ...recipe,
      ...espressoCostFor(recipe),
      ...packagingCostFor(recipe, costingData),
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
      ...costingData.pricingOptions,
      suggestedIngredientsPrice: recipe.ingredientCostDollars * costingData.pricingOptions.ingredientMarkup,
      suggestedPackagingPrice: recipe.packagingCostDollars * costingData.pricingOptions.packagingMarkup,
    }))
    .map(recipe => ({
      ...recipe,
      suggestedPrice: roundToTwoDecimalPlaces(
        recipe.suggestedIngredientsPrice +
        recipe.suggestedPackagingPrice -
        recipe.discountDollars
      )
    }));
