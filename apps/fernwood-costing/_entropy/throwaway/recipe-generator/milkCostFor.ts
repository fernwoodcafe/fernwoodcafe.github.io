import type { RecipePermutation } from ".";
import type { CostingData } from "./data/schema";

export default (
  recipe: Pick<RecipePermutation, "drinkSizeOunces" | "espressoFluidOunces">,
  costingData: CostingData
) => {
  const milkSteamedOunces = recipe.drinkSizeOunces - recipe.espressoFluidOunces;
  const milkColdOunces =
    costingData.steamedMilkFromColdMilkForLatte.get(milkSteamedOunces);
  const milkCostDollars =
    milkColdOunces *
    costingData.costForIngredient.get("dairy_3_percent_cost_per_ounce");
  return {
    milkSteamedOunces,
    milkColdOunces,
    milkCostDollars,
  };
};
