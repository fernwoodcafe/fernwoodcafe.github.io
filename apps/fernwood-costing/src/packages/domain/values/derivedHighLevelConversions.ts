import type { UnitConversion } from "../types/UnitConversion";
import type { UnitOfMeasure } from "../types/UnitOfMeasure";

export const derivedHighLevelConversions = (
  lowLevelConversions: readonly UnitConversion[],
  unitsOfMeasureToConvert: readonly UnitOfMeasure[]
): UnitConversion[] =>
  unitsOfMeasureToConvert.reduce((acc, fromUnit) => {
    const candidateConversions = unitsOfMeasureToConvert.map(
      (toUnit) => [fromUnit, toUnit] as const
    );

    const targetConversions = candidateConversions
      // Avoid converting to self.
      .filter(([fromUnit, toUnit]) => fromUnit !== toUnit)
      // Avoid duplicating the low-level conversions.
      .filter(
        ([fromUnit, toUnit]) =>
          undefined ===
          lowLevelConversions.find(
            (low) => fromUnit === low.FromUnit && toUnit === low.ToUnit
          )
      );

    const derivedConversions = targetConversions.map(([fromUnit, toUnit]) => {
      const toUnitsPerBaseUnit = lowLevelConversions.find(
        (low) => fromUnit === low.ToUnit
      ).FromUnitsPerToUnits;

      const fromUnitsPerBaseUnit = lowLevelConversions.find(
        (low) => toUnit == low.ToUnit
      ).FromUnitsPerToUnits;

      const fromUnitsPerToUnits = fromUnitsPerBaseUnit / toUnitsPerBaseUnit;
      return [fromUnit, toUnit, fromUnitsPerToUnits];
    });

    return [...acc, ...derivedConversions];
  }, []);
