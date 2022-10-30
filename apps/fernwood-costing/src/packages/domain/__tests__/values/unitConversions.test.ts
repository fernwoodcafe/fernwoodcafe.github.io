import { unitConversions } from "@packages/domain/values";
import { describe, expect, it } from "vitest";

const expectedConversions = [
  // Low-Level: Values checked online on 2022-10-29
  "1000.0000 gram/kilogram",
  "28.3495 gram/ounce-mass",
  "453.5924 gram/pound",
  // Low-Level: Values checked online on 2022-10-29
  "250.0000 millilitre/cup-metric",
  "1000.0000 millilitre/litre",
  "29.5700 millilitre/ounce-fluid-us",
  "4.9289 millilitre/teaspoon-us",
  "14.7868 millilitre/tablespoon-us",
  // Derived
  "0.0010 kilogram/gram",
  "0.0353 ounce-mass/gram",
  "0.0022 pound/gram",
  "0.0040 cup-metric/millilitre",
  "0.0010 litre/millilitre",
  "0.0338 ounce-fluid-us/millilitre",
  "0.2029 teaspoon-us/millilitre",
  "0.0676 tablespoon-us/millilitre",
  "16.0000 ounce-mass/pound",
  "35.2740 ounce-mass/kilogram",
  "0.0625 pound/ounce-mass",
  "2.2046 pound/kilogram",
  "0.0283 kilogram/ounce-mass",
  "0.4536 kilogram/pound",
  "0.0296 litre/ounce-fluid-us",
  "0.2500 litre/cup-metric",
  "0.0049 litre/teaspoon-us",
  "0.0148 litre/tablespoon-us",
  "33.8181 ounce-fluid-us/litre", // Correct the precision.
  "8.4545 ounce-fluid-us/cup-metric", // Correct the precision.
  "0.1667 ounce-fluid-us/teaspoon-us",
  "0.5001 ounce-fluid-us/tablespoon-us",
  "4.0000 cup-metric/litre",
  "0.1183 cup-metric/ounce-fluid-us",
  "0.0197 cup-metric/teaspoon-us",
  "0.0591 cup-metric/tablespoon-us",
  "202.8842 teaspoon-us/litre",
  "5.9993 teaspoon-us/ounce-fluid-us",
  "50.7211 teaspoon-us/cup-metric",
  "3.0000 teaspoon-us/tablespoon-us",
  "67.6279 tablespoon-us/litre",
  "1.9998 tablespoon-us/ounce-fluid-us",
  "16.9070 tablespoon-us/cup-metric",
  "0.3333 tablespoon-us/teaspoon-us",
];

describe("unitConversions", () => {
  it("produces all expected conversions", () => {
    // Act
    const actualConversions = unitConversions.map(
      ({ FromUnit, ToUnit, ConversionFactor: FromUnitsPerToUnits }) =>
        `${FromUnitsPerToUnits.toFixed(4)} ${FromUnit}/${ToUnit}`
    );

    // Assert
    expect(actualConversions).toEqual(expectedConversions);
  });
});
