import type { UnitConversion } from "../types/UnitConversion";
import type { UnitOfMeasure } from "../types/UnitOfMeasure";

export const deriveHighLevelConversions = (
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
            (low) => low.FromUnit === fromUnit && low.ToUnit === toUnit
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

      return {
        FromUnit: fromUnit,
        ToUnit: toUnit,
        FromUnitsPerToUnits: fromUnitsPerToUnits,
      };
    });

    return [...acc, ...derivedConversions];
  }, []);
