import { describe, expect, it } from "vitest";
import { valueConvertedToUnit } from "../../services";

describe("when processing valid inputs", () => {
  it("does not throw", () => {
    // Act
    valueConvertedToUnit(1, "kilogram", "gram");
  });

  [
    ["kilogram", 1, "gram", 1000] as const,
    ["pound", 1, "gram", 453.5924] as const,
    ["gram", 1, "kilogram", 0.001] as const,
    ["gram", 1, "pound", 0.0022] as const,
    ["pound", 1, "kilogram", 0.4536] as const,
    ["kilogram", 1, "pound", 2.2046] as const,
  ].forEach(([fromUnit, fromValue, toUnit, expectedToValue]) => {
    it(`converts ${fromValue} ${fromUnit} to ${expectedToValue} ${toUnit}`, () => {
      // Act
      const converted = valueConvertedToUnit(1, fromUnit, toUnit);

      // Assert
      expect(converted.toFixed(4)).toEqual(expectedToValue.toFixed(4));
    });
  });
});
