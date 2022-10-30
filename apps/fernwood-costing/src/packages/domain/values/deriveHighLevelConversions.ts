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
      const toBase = lowLevelConversions.find((low) => fromUnit === low.ToUnit);
      const fromBase = lowLevelConversions.find((low) => toUnit == low.ToUnit);

      const fromUnitsPerToUnits =
        fromBase.FromUnitsPerToUnits / toBase.FromUnitsPerToUnits;

      const conversion = {
        FromUnit: fromUnit,
        ToUnit: toUnit,
        FromUnitsPerToUnits: fromUnitsPerToUnits,
      };

      return conversion;
    });

    return [...acc, ...derivedConversions];
  }, []);
