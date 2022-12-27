import type { RecipePermutation } from '../recipeGenerator';

const printHeader = (text: string) => {
  console.log('');
  console.log(text);
  console.log('');
};

export default (recipes: RecipePermutation[]) => {

  printHeader("Recipe");

  console.table(recipes.map(r => ({
    description: r.descriptiveName,
    size: r.drinkSizeOunces,
    shots: r.espressoShots,
    espressoGrams: r.espressoGrams,
    espressoFluidOunces: r.espressoFluidOunces,
    milk: r.milkAlternative,
    cup: r.cupKind,
  })));

  printHeader('Cost');

  console.table(recipes.map(r => ({
    description: r.descriptiveName,
    "ingredient cost ($)": r.ingredientCostDollars,
    "ingredient markup": r.ingredientMarkup,
    "packaging cost ($)": r.packagingCostDollars,
    "packaging markup": r.packagingMarkup,
    "total cost ($)": r.totalCostDollars,
  })));

  printHeader('Suggested Price');

  for(const size of [12, 16]) {

    console.table(recipes
        .filter(r => r.drinkSizeOunces === size)
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
