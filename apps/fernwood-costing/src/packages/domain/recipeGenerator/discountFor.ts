import type { RecipePermutation } from '.';

export default (recipe: Pick<RecipePermutation, "cupKind">) => {
  const discounts = [];

  if (recipe.cupKind === "own_cup") {
    discounts.push([
      recipe.cupKind, 0.50
    ]);
  }

  const discountDollars = discounts.reduce((acc, next) => acc + next[1], 0);

  return {
    discounts,
    discountDollars
  };
};
