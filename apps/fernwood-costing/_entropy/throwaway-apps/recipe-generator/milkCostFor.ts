import type { RecipePermutation } from "./index.ts";
import type { CostingData } from "./data/schema.ts";

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
