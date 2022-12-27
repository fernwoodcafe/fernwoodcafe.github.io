import { roundToTwoDecimalPlaces } from '../math/roundToDecimalPlaces';
import type {
  AvailableCupKind,
  AvailableDrinkSizesInOunces,
  AvailableEspressoShots,
  AvailableMilkAlternative, CostingData, PricingOptions
} from './data/schema';
import discountFor from './discountFor';
import espressoCostFor from './espressoCostFor';
import milkCostFor from './milkCostFor';
import packagingCostFor from './packagingCostFor';

export type RecipePermutation = PricingOptions & {
  descriptiveName: string;
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
      descriptiveName: `${recipe.drinkSizeOunces} oz ${recipe.espressoShots} shot ${recipe.milkAlternative} ${recipe.cupKind}`,
      ...espressoCostFor(recipe, costingData),
      ...packagingCostFor(recipe, costingData),
    }))
    .map((recipe) => ({
      ...recipe,
      ...milkCostFor(recipe, costingData),
    }))
    .map(recipe => ({
      ...recipe,
      ...discountFor(recipe, costingData)
    }))
    .map((recipe) => ({
      ...recipe,
      ingredientCostDollars:
        recipe.espressoCostDollars +
        recipe.milkCostDollars,
      totalCostDollars:
        recipe.packagingCostDollars +
        recipe.espressoCostDollars +
        recipe.milkCostDollars,
    }))
    .map(recipe => ({
      ...recipe,
      ...costingData.pricingOptions,
      suggestedIngredientsPrice: recipe.ingredientCostDollars * costingData.pricingOptions.ingredientMarkup,
      suggestedPackagingPrice: recipe.packagingCostDollars * costingData.pricingOptions.packagingMarkup,
    }))
    .map(recipe => ({
      ...recipe,
      suggestedPrice:
        recipe.suggestedIngredientsPrice +
        recipe.suggestedPackagingPrice -
        recipe.discountDollars
    }))
    .map(recipe => Object.entries(recipe).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: typeof value === 'number' ? roundToTwoDecimalPlaces(value) : value
    }), {} as RecipePermutation));
