import { describe, expect, it } from "vitest";
import recipeGenerator, { type AvailableCustomerOptions, type PricingOptions } from "../recipeGenerator";


describe("recipeGenerator", () => {
  it("outputs expected recipes", () => {
    // Arranage
    const customerOptions: AvailableCustomerOptions = {
      availableSizesInOunces: [12, 16],
      availableExpressoShots: [2, 4],
      availableMilkAlternatives: ["dairy_3_percent"],
      availableCups: ["for_here", "to_go"],
    };

    const pricingOptions: PricingOptions = {
      ingredientMarkup: 4,
      packagingMarkup: 2
    };

    // Act
    const recipes = recipeGenerator(customerOptions, pricingOptions);

    // Dump
    console.table(recipes.map(r => ({
      size: r.drinkSizeOunces,
      shots: r.espressoShots,
      milk: r.milkAlternative,
      cup: r.cupKind,
      cost: r.totalCostDollars,
    })));

    console.table(recipes.map(r => ({
      description: `${r.drinkSizeOunces} oz ${r.espressoShots} shot ${r.milkAlternative} ${r.cupKind}`,
      ingredientCost: r.ingredientCostDollars,
      packagingCost: r.packagingCostDollars,
      totalCost: r.totalCostDollars,
      suggestedPrice: r.suggestedPrice
    })));

    // Assert
    expect(recipes).to.deep.include.members([
      {
        // 12 ounce 2 shot oat milk latte to go.
        drinkSizeOunces: 12,
        espressoShots: 2,
        milkAlternative: "dairy_3_percent",
        cupKind: "to_go",
        // espresso cost
        espressoGrams: 18.5,
        espressoFluidOunces: 1.5,
        espressoCostDollars: 0.57,
        // milk cost
        milkSteamedOunces: 10.5,
        milkColdOunces: 8.5,
        milkCostDollars: 0.43,
        // packaging cost
        packagingCostDollars: 0.38,
        // total cost
        ingredientCostDollars: 1,
        totalCostDollars: 1.38,
        // price
        packagingMarkup: 2,
        ingredientMarkup: 4,
        suggestedPrice: 4.76
      },
    ]);
  });
});
