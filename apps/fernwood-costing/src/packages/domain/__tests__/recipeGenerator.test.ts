import { beforeAll, describe, expect, it } from "vitest";
import recipeGenerator, {
  type RecipePermutation
} from "../recipeGenerator";
import database from '../recipeGenerator/data/database';
import dumpRecipes from './dumpRecipes';

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
