import { describe, expect, it } from "vitest";
import recipeGenerator, { type AvailableCustomerOptions, type PricingOptions } from "../recipeGenerator";
import recipeGeneratorExpectation_01 from './recipeGeneratorExpectation_01';
import recipeGeneratorExpectation_02 from './recipeGeneratorExpectation_02';

describe("recipeGenerator", () => {
  it("outputs expected recipes", () => {
    // Arranage
    const customerOptions: AvailableCustomerOptions = {
      availableSizesInOunces: [12],
      availableExpressoShots: [2],
      availableMilkAlternatives: ["dairy_3_percent"],
      availableCups: ["to_go", "own_cup", /* "for_here" */],
    };

    const pricingOptions: PricingOptions = {
      ingredientMarkup: 4,
      packagingMarkup: 2
    };

    // Act
    const recipes = recipeGenerator(customerOptions, pricingOptions);

    // Dump
    console.log('');
    console.log('Recipe');
    console.log('');

    console.table(recipes.map(r => ({
      size: r.drinkSizeOunces,
      shots: r.espressoShots,
      milk: r.milkAlternative,
      cup: r.cupKind,
    })));

    console.log('');
    console.log('Cost');
    console.log('');

    console.table(recipes.map(r => ({
      description: `${r.drinkSizeOunces} oz ${r.espressoShots} shot ${r.milkAlternative} ${r.cupKind}`,
      "ingredient cost ($)": r.ingredientCostDollars.toFixed(2),
      "packaging cost ($)": r.packagingCostDollars.toFixed(2),
      "total cost ($)": r.totalCostDollars.toFixed(2),
    })));

    console.log('');
    console.log('Suggested Price');
    console.log('');

    console.table(recipes.map(r => ({
      description: `${r.drinkSizeOunces} oz ${r.espressoShots} shot ${r.milkAlternative} ${r.cupKind}`,
      packagingMarkup: r.packagingMarkup,
      ingredientMarkup: r.ingredientMarkup,
      "discount ($)": r.discountDollars.toFixed(2),
      "suggested price ($)": r.suggestedPrice.toFixed(2)
    })));


    // console.log(JSON.stringify(recipes[2], undefined, 2));

    // Assert
    expect(recipes).to.deep.include.members([
      recipeGeneratorExpectation_01,
      recipeGeneratorExpectation_02,
    ]);
  });
});
