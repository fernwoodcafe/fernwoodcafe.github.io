import { describe, expect, it } from "vitest";
import { availableUnitConversions } from "../services";

describe("when processing valid inputs", () => {
  it("does not throw", () => {
    // Act
    availableUnitConversions("gram");
  });

  [
    {
      fromUnit: "gram" as const,
      expectedToUnits: ["pound", "kilogram", "gram"],
    },
  ].forEach(({ fromUnit, expectedToUnits }) => {
    it("produces expected conversions", () => {
      // Arrange

      // Act
      const toUnits = availableUnitConversions(fromUnit);

      // Assert
      expect(toUnits.sort()).toEqual(expectedToUnits.sort());
    });
  });
});
