import { describe, expect, it } from "vitest";
import { availableUnitConversions } from "../services";
import {
  isItem,
  isMass,
  isVolume,
  type UnitOfMeasure,
} from "../types/UnitOfMeasure";
import { unitsOfMeasure } from "../values";
import {
  unitsOfMeasureMass,
  unitsOfMeasureVolume,
} from "../values/unitsOfMeasure";

describe("when processing valid inputs", () => {
  it("does not throw", () => {
    // Act
    availableUnitConversions("gram");
  });

  const expectedAvailableConversions = (unit: UnitOfMeasure) => {
    if (isMass(unit)) {
      return unitsOfMeasureMass;
    }

    if (isVolume(unit)) {
      return unitsOfMeasureVolume;
    }

    if (isItem(unit)) {
      return [unit];
    }
  };

  unitsOfMeasure
    .filter((m) => m !== "-")
    .map((unitOfMeasure) => ({
      fromUnit: unitOfMeasure,
      expectedToUnits: [...expectedAvailableConversions(unitOfMeasure)],
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
