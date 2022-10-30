import unitConversions from "@packages/domain/values/unitConversions";
import { describe, expect, it } from "vitest";

const expectedConversions = [
  // Low-Level: Values checked online on 2022-10-29
  "1000.0000 gram/kilogram",
  "28.3460 gram/ounce-mass",
  "453.5924 gram/pound",
  // Low-Level: Values checked online on 2022-10-29
  "250.0000 millilitre/cup-metric",
  "1000.0000 millilitre/litre",
  "29.5700 millilitre/ounce-fluid-us",
  // Possible to Derive, Currently Hard Coded
  // Values checked online on 2022-10-29
  // Possible to Derive, Currently Hard Coded
  // Values checked online on 2022-10-29
  // Calculated: No need to check values online.
  "0.0010 kilogram/gram",
  "0.0353 ounce-mass/gram",
  "0.0022 pound/gram",
  "0.0040 cup-metric/millilitre",
  "0.0010 litre/millilitre",
  "0.0338 ounce-fluid-us/millilitre",
  "16.0020 ounce-mass/pound", // Correct the precision.
  "35.2783 ounce-mass/kilogram", // Correct the precision.
  "0.0625 pound/ounce-mass",
  "2.2046 pound/kilogram",
  "0.0283 kilogram/ounce-mass",
  "0.4536 kilogram/pound",
  "0.0296 litre/ounce-fluid-us",
  "0.2500 litre/cup-metric",
  "33.8181 ounce-fluid-us/litre", // Correct the precision.
  "8.4545 ounce-fluid-us/cup-metric", // Correct the precision.
  "4.0000 cup-metric/litre",
  "0.1183 cup-metric/ounce-fluid-us",
];

describe("unitConversions", () => {
  it("produces all expected conversions", () => {
    // Act
    const actualConversions = unitConversions.map(
      ({ FromUnit, ToUnit, FromUnitsPerToUnits }) =>
        `${FromUnitsPerToUnits.toFixed(4)} ${FromUnit}/${ToUnit}`
    );

    // Assert
    expect(actualConversions).toEqual(expectedConversions);
  });
});
