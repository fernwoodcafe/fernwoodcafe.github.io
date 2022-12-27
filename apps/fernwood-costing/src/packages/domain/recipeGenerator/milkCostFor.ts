import type { RecipePermutation } from '.';
import { roundToTwoDecimalPlaces } from '../math/roundToDecimalPlaces';

export default (recipe: Pick<RecipePermutation, 'drinkSizeOunces' | 'espressoFluidOunces'>) => {
  const latteMilkSteamedToColdRatio = new Map<number, number>([
    [9, 7],
    [10.5, 8.5],
    [13, 9.5],
    [14.5, 11],
  ]);

  const dairy_3_percent_cost_per_ounce = 0.05;

  const milkSteamedOunces = recipe.drinkSizeOunces - recipe.espressoFluidOunces;
  const milkColdOunces = latteMilkSteamedToColdRatio.get(milkSteamedOunces);
  const milkCostDollars = roundToTwoDecimalPlaces(
    milkColdOunces * dairy_3_percent_cost_per_ounce
  );
  return {
    milkSteamedOunces,
    milkColdOunces,
    milkCostDollars,
  };
};
