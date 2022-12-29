import type { RecipePermutation } from ".";
import type { CostingData } from "./data/schema";

export default (
  recipe: Pick<RecipePermutation, "cupKind" | "drinkSizeOunces">,
  costingData: CostingData
) => {
  const packaging =
    recipe.cupKind === "to_go"
      ? costingData.packagingForHotDrinkSizeInOunces.get(recipe.drinkSizeOunces)
      : [];

  const packacingCost = packaging.reduce(
    (acc, next) => acc + costingData.costForPackaging.get(next),
    0
  );

  return {
    packaging,
    packagingCostDollars: packacingCost,
  };
};
