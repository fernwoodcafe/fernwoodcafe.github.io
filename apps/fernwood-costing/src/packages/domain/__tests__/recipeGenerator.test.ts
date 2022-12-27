import { beforeAll, describe, expect, it } from "vitest";
import recipeGenerator, {
  type RecipePermutation
} from "../recipeGenerator";
import database from '../recipeGenerator/data/database';

// Arranage
describe("recipeGenerator", () => {
  let recipes: RecipePermutation[];
  beforeAll(() => {
    // Act
    recipes = recipeGenerator(database);

    // Dump
    dumpRecipes(recipes);
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
      size: r.drinkSizeOunces,
      shots: r.espressoShots,
      milk: r.milkAlternative,
      cup: r.cupKind,
    })));

    header('Cost');

    console.table(recipes.map(r => ({
      description: `${r.drinkSizeOunces} oz ${r.espressoShots} shot ${r.milkAlternative} ${r.cupKind}`,
      "ingredient cost ($)": r.ingredientCostDollars.toFixed(2),
      "packaging cost ($)": r.packagingCostDollars.toFixed(2),
      "total cost ($)": r.totalCostDollars.toFixed(2),
    })));

    header('Suggested Price');

    console.table(recipes.map(r => ({
      description: `${r.drinkSizeOunces} oz ${r.espressoShots} shot ${r.milkAlternative} ${r.cupKind}`,
      "packaging markup": r.packagingMarkup,
      "packaging price": r.suggestedPackagingPrice,
      "ingredient markup": r.ingredientMarkup,
      "ingredient price": r.suggestedIngredientsPrice,
      "discount ($)": r.discountDollars.toFixed(2),
      "suggested price ($)": r.suggestedPrice.toFixed(2)
    })));

    header('Example Item');

    console.log(recipes[0]);
};
