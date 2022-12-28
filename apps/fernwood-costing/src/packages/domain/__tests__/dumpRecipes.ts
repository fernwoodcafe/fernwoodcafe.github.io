import type { RecipePermutation } from "../recipeGenerator";

const printHeader = (text: string) => {
  console.log("");
  console.log(text);
  console.log("");
};

export default (
  recipes: RecipePermutation[],
  recipeFilter: (recipe: RecipePermutation) => boolean = () => true
) => {
  const groupedRecipes = recipes.filter(recipeFilter).reduce((acc, next) => {
    if (!acc.has(next.drinkSizeOunces)) {
      acc.set(next.drinkSizeOunces, []);
    }

    acc.get(next.drinkSizeOunces).push(next);
    return acc;
  }, new Map<number, RecipePermutation[]>());

  printHeader(`Recipe`);

  for (const [_, recipeGroup] of groupedRecipes.entries()) {
    const keys: (keyof RecipePermutation)[] = [
      "descriptiveName",
      "espressoCostDollars",
      "milkCostDollars",
      "totalCostDollars",
      "ingredientMarkup",
      "suggestedIngredientsPrice",
    ];

    console.table(
      recipeGroup.map((r) => Object.fromEntries(keys.map((k) => [k, r[k]])))
    );
  }

  // printHeader(`Cost`);

  // for (const [_, recipeGroup] of groupedRecipes.entries()) {
  //   console.table(
  //     recipeGroup.map((r) => ({
  //       description: r.descriptiveName,
  //       "ingredient cost ($)": r.ingredientCostDollars,
  //       "ingredient markup": r.ingredientMarkup,
  //       "packaging cost ($)": r.packagingCostDollars,
  //       "packaging markup": r.packagingMarkup,
  //       "total cost ($)": r.totalCostDollars,
  //     }))
  //   );
  // }

  // printHeader(`Suggested Price`);

  // for (const [_, recipeGroup] of groupedRecipes.entries()) {
  //   console.table(
  //     recipeGroup
  //       .sort((left, right) => left.suggestedPrice - right.suggestedPrice)
  //       .map((r) => ({
  //         description: r.descriptiveName,
  //         "ingredient price ($)": r.suggestedIngredientsPrice,
  //         "packaging price ($)": r.suggestedPackagingPrice,
  //         "discount ($)": r.discountDollars,
  //         "suggested price ($)": r.suggestedPrice,
  //       }))
  //   );
  // }

  // printHeader(`Details`);

  // const projection: (keyof RecipePermutation)[] = ["descriptiveName"];

  // for (const [_, recipeGroup] of groupedRecipes.entries()) {
  //   for (const recipe of recipeGroup) {
  //     console.log(
  //       Object.entries(recipe).reduce((acc, [key, value]) => {
  //         return projection.includes(key)
  //           ? {
  //               ...acc,
  //               [key]: value,
  //             }
  //           : acc;
  //       }, {})
  //     );
  //   }
  // }
};
