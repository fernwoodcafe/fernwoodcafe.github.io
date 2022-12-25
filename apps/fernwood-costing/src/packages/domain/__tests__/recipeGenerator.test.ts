import { describe, expect, it } from "vitest";
import recipeGenerator, { type CustomerOptions } from "../recipeGenerator";



describe("recipeGenerator", () => {
  it("outputs expected recipes", () => {
    // Arranage
    const options: CustomerOptions = {
      availableSizesInOunces: [12],
      availableExpressoShots: [2],
      availableMilkAlternatives: ["dairy_3_percent"],
      availableCups: ["for_here", "own_cup", "to_go"],
    };

    // Act
    const recipes = recipeGenerator(options);

    // Dump
    console.table(recipes);

    // Assert
    expect(recipes).to.deep.include.members([
      {
        // 12 ounce 2 shot oat milk latte to go.
        cupSizeOunces: 12,
        espressoShots: 2,
        milkAlternative: "dairy_3_percent",
        cupKind: "to_go",
        // espresso cost
        espressoGrams: 18.5,
        espressoFluidOunces: 1.5,
        espressoCostDollars: 0.57,
        // milk cost
        // milkSteamedOunces: 10.5,
        // milkColdOunces: 8.5,
        // milkCostDollars: 0.42,
        // packaging cost
        packagingCostDollars: 0.38
      },
    ]);
  });
});
