import type { RecipePermutation } from '.';
import { roundToTwoDecimalPlaces } from '../math/roundToDecimalPlaces';
import type { CostingData } from './data/schema';

export default (
  recipe: Pick<RecipePermutation, 'drinkSizeOunces' | 'espressoFluidOunces'>,
  costingData: CostingData
) => {

  const milkSteamedOunces = recipe.drinkSizeOunces - recipe.espressoFluidOunces;
  const milkColdOunces = costingData.steamedMilkFromColdMilkForLatte.get(milkSteamedOunces);
  const milkCostDollars = roundToTwoDecimalPlaces(
    milkColdOunces * costingData.costForIngredient.get('dairy_3_percent_cost_per_ounce')
  );
  return {
    milkSteamedOunces,
    milkColdOunces,
    milkCostDollars,
  };
};
