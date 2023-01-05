import type { RecipePermutation } from "./index.ts";
import type { CostingData } from "./data/schema.ts";

export default (
  recipe: Pick<RecipePermutation, "espressoShots">,
  costingData: CostingData
) => {
  const espressoGrams =
    costingData.espressoCosting.gramsPerShot * recipe.espressoShots;
  return {
    espressoGrams,
    espressoFluidOunces:
      costingData.espressoCosting.ouncesPerShot * recipe.espressoShots,
    espressoCostDollars:
      costingData.espressoCosting.costPerGram * espressoGrams,
  };
};
