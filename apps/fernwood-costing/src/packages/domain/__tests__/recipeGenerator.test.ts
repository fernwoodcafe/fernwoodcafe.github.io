import { beforeAll, describe, expect, it } from "vitest";
import recipeGenerator, {
  type RecipePermutation
} from "../recipeGenerator";
import database from '../recipeGenerator/data/database';

const someExpectedPrices = [
  ['12 oz 2 shot dairy_3_percent for_here', 4.74]
];

// Arranage
describe("recipeGenerator", () => {
  let recipes: RecipePermutation[];
  beforeAll(() => {
    // Act
    recipes = recipeGenerator(database);

    // Dump
    dumpRecipes(recipes);
  });

  someExpectedPrices.forEach(([name, price]) => {
    it(`prices the ${name} at ${price}`, () => {
      const recipe = recipes.find(r => r.descriptiveName === name);
      expect(recipe.suggestedPrice).toEqual(price);
    }
    )
  });

  it("matches snapshot", () => {
    // Assert
    expect(recipes).toMatchSnapshot();
  });
});

const dumpRecipes = (recipes: RecipePermutation[]) => {

  const header = (text: string) => {
    console.log('');
    console.log(text);
    console.log('');
  };

  header("Recipe");

  console.table(recipes.map(r => ({
    description: r.descriptiveName,
    size: r.drinkSizeOunces,
    shots: r.espressoShots,
    espressoGrams: r.espressoGrams,
    espressoFluidOunces: r.espressoFluidOunces,
    milk: r.milkAlternative,
    cup: r.cupKind,
  })));

  header('Cost');

  console.table(recipes.map(r => ({
    description: r.descriptiveName,
    "ingredient cost ($)": r.ingredientCostDollars,
    "packaging cost ($)": r.packagingCostDollars,
    "total cost ($)": r.totalCostDollars,
  })));

  header('Suggested Price');

  console.table(recipes.map(r => ({
    description: r.descriptiveName,
    "packaging markup": r.packagingMarkup,
    "ingredient markup": r.ingredientMarkup,
    "packaging price ($)": r.suggestedPackagingPrice,
    "ingredient price ($)": r.suggestedIngredientsPrice,
    "discount ($)": r.discountDollars,
    "suggested price ($)": r.suggestedPrice,
  })));
};
