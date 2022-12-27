import { beforeAll, describe, expect, it } from "vitest";
import recipeGenerator, {
  type AvailableCustomerOptions,
  type PricingOptions,
  type RecipePermutation
} from "../recipeGenerator";

// Arranage
const customerOptions: AvailableCustomerOptions = {
  availableSizesInOunces: [12],
  availableExpressoShots: [2],
  availableMilkAlternatives: ["dairy_3_percent"],
  availableCups: ["to_go", "own_cup", "for_here"],
};

const pricingOptions: PricingOptions = {
  ingredientMarkup: 4,
  packagingMarkup: 2
};

describe("recipeGenerator", () => {
  let recipes: RecipePermutation[];
  beforeAll(() => {
    // Act
    recipes = recipeGenerator(customerOptions, pricingOptions);

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
