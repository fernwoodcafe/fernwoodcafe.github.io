import unitConversions from "@packages/domain/values/unitConversions";
import { describe, expect, it } from "vitest";

const expectedConversions = [
  // Low-Level // Values checked online on 2022-10-29
  "1000.0000 gram/kilogram",
  "28.3460 gram/ounce-mass",
  "453.5924 gram/pound",
  // Low-Level // Values checked online on 2022-10-29
  "250.0000 millilitre/cup-metric",
  "1000.0000 millilitre/litre",
  "29.5700 millilitre/ounce-fluid-us",
  // Possible to Derive, Currently Hard Coded
  // Values checked online on 2022-10-29
  "35.2740 ounce-mass/kilogram",
  "16.0000 ounce-mass/pound",
  "2.2046 pound/kilogram",
  // Possible to Derive, Currently Hard Coded
  // Values checked online on 2022-10-29
  "8.4535 ounce-fluid-us/cup-metric",
  "33.8140 ounce-fluid-us/litre",
  "4.0000 cup-metric/litre",
  // Calculated
  "0.0010 kilogram/gram",
  "0.0353 ounce-mass/gram",
  "0.0022 pound/gram",
  "0.0040 cup-metric/millilitre",
  "0.0010 litre/millilitre",
  "0.0338 ounce-fluid-us/millilitre",
  "0.0283 kilogram/ounce-mass",
  "0.0625 pound/ounce-mass",
  "0.4536 kilogram/pound",
  "0.1183 cup-metric/ounce-fluid-us",
  "0.0296 litre/ounce-fluid-us",
  "0.2500 litre/cup-metric",
];

describe("when processing valid inputs", () => {
  it("does not throw", () => {
    // Act
    const actualConversions = unitConversions.map(
      ({ FromUnit, ToUnit, Multiplier }) =>
        `${Multiplier.toFixed(4)} ${FromUnit}/${ToUnit}`
    );

    console.log(actualConversions);

    // Assert
    expect(actualConversions).toEqual(expectedConversions);
  });
});
