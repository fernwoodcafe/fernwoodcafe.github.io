import { describe, expect, it } from "vitest";
import recipeGenerator, { type AvailableCustomerOptions } from "../recipeGenerator";


describe("recipeGenerator", () => {
  it("outputs expected recipes", () => {
    // Arranage
    const options: AvailableCustomerOptions = {
      availableSizesInOunces: [12, 16],
      availableExpressoShots: [2, 4],
      availableMilkAlternatives: ["dairy_3_percent"],
      availableCups: ["for_here", "to_go"],
    };

    // Act
    const recipes = recipeGenerator(options);

    // Dump
    console.table(recipes.map(recipe => ({
      size: recipe.drinkSizeOunces,
      shots: recipe.espressoShots,
      milk: recipe.milkAlternative,
      cup: recipe.cupKind,
      cost: recipe.totalCostDollars,
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
        totalCostDollars: 1.38
      },
    ]);
  });
});
