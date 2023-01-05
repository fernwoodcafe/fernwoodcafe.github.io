import type { RecipePermutation } from "./index.ts";
import type { CostingData } from "./data/schema.ts";

export default (
  recipe: Pick<RecipePermutation, "cupKind" | "drinkSizeOunces">,
  costingData: CostingData
) => {
  const packaging =
    recipe.cupKind === "to_go"
      ? costingData.packagingForHotDrinkSizeInOunces.get(recipe.drinkSizeOunces)
      : [];

  const packacingCost = packaging?.reduce(
    (acc, next) => acc + costingData.costForPackaging.get(next),
    0
  );

  return {
    packaging,
    packagingCostDollars: packacingCost,
  };
};
