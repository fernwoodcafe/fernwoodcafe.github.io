import type { RecipePermutation } from '../recipeGenerator';

const printHeader = (text: string) => {
  console.log('');
  console.log(text);
  console.log('');
};

export default (recipes: RecipePermutation[]) => {

  const groupedRecipes = recipes.reduce((acc, next) => {
    if (!acc.has(next.drinkSizeOunces)) {
      acc.set(next.drinkSizeOunces, []);
    };

    acc.get(next.drinkSizeOunces).push(next);
    return acc;
  }, new Map<number, RecipePermutation[]>());

  printHeader(`Recipe`);

  for (const [_, recipeGroup] of groupedRecipes.entries()) {

    console.table(recipeGroup.map(r => ({
      description: r.descriptiveName,
      espressoGrams: r.espressoGrams,
      espressoFluidOunces: r.espressoFluidOunces,
      milkColdOunces: r.milkColdOunces
    })));
  }

  printHeader(`Cost`);

  for (const [_, recipeGroup] of groupedRecipes.entries()) {

    console.table(recipeGroup.map(r => ({
      description: r.descriptiveName,
      "ingredient cost ($)": r.ingredientCostDollars,
      "ingredient markup": r.ingredientMarkup,
      "packaging cost ($)": r.packagingCostDollars,
      "packaging markup": r.packagingMarkup,
      "total cost ($)": r.totalCostDollars,
    })));
  }

  printHeader(`Suggested Price`);

  for (const [_, recipeGroup] of groupedRecipes.entries()) {

    console.table(recipeGroup
      .sort((left, right) => left.suggestedPrice - right.suggestedPrice)
      .map(r => ({
        description: r.descriptiveName,
        "ingredient price ($)": r.suggestedIngredientsPrice,
        "packaging price ($)": r.suggestedPackagingPrice,
        "discount ($)": r.discountDollars,
        "suggested price ($)": r.suggestedPrice,
      })));
  }
};
