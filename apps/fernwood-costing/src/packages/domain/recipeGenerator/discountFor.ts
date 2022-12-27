import type { RecipePermutation } from '.';
import type { CostingData } from './data/schema';

export default (
  recipe: Pick<RecipePermutation, "cupKind">,
  costingData: CostingData
) => {
  const discounts = [];

  if (recipe.cupKind === "own_cup") {
    discounts.push([
      recipe.cupKind, costingData.discounts.get("own_cup")
    ]);
  }

  const discountDollars = discounts.reduce((acc, next) => acc + next[1], 0);

  return {
    discounts,
    discountDollars
  };
};
