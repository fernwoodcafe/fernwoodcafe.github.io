import { describe, expect, it } from "vitest";
import { availableUnitConversions } from "../services";
import { unitsOfMeasure } from "../values";
import { unitsOfMeasureMass } from "../values/unitsOfMeasure";

describe("when processing valid inputs", () => {
  it("does not throw", () => {
    // Act
    availableUnitConversions("gram");
  });

  unitsOfMeasure
    .filter((m) => m !== "-")
    .slice(0, 2)
    .map((unitOfMeasure) => ({
      fromUnit: unitOfMeasure,
      expectedToUnits: [...unitsOfMeasureMass],
    }))
    .forEach(({ fromUnit, expectedToUnits }) => {
      it(`produces expected conversions for ${fromUnit}`, () => {
        // Arrange

        // Act
        const toUnits = availableUnitConversions(fromUnit);

        // Assert
        expect(toUnits.sort()).toEqual(expectedToUnits.sort());
      });
    });
});
