import { describe, expect, it } from "vitest";
import recipeGenerator, { type CustomerOptions } from "../recipeGenerator";








describe("recipeGenerator", () => {
  it("outputs expected recipes", () => {
    // Arranage
    const options: CustomerOptions = {
      availableSizesInOunces: [8, 12, 16],
      availableExpressoShots: [2, 4, 6],
      availableMilkAlternatives: [
        "dairy_one_percent",
        "dairy_3_percent",
        "dairy_10_percent",
        "oat",
        "almond",
      ],
      availableCups: [
        'for_here',
        'own_cup',
        'to_go'
      ],
    };

    // Act
    const recipes = recipeGenerator(options);

    // Dump
    console.table(recipes);

    // Assert
    expect(recipes).to.deep.include.members([
      {
        // 12 ounce 2 shot oat milk latte to go.
        size: 12,
        espressoShots: 2,
        milkAlternative: 'dairy_3_percent',
        cup: 'to_go',
        // espresso cost
        espressoGrams: 18.5,
        espressoFluidOunces: 1.5,
        espressoCostDollars: 0.57,
        // milk cost
        // milkSteamedOunces: 10.5,
        // milkColdOunces: 8.5,
        // milkCostDollars: 0.42,
        // packaging cost
        // packagingCostDollars: 0.38
      },
    ]);
  });
});
