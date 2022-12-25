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
        size: 8,
        shots: 2,
        milk: 'oat',
        cup: 'to_go'
      },
    ]);
  });
});
