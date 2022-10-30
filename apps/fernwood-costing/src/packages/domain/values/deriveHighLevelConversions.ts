import type { UnitConversionTuple } from "../types/UnitConversion";
import type { UnitOfMeasure } from "../types/UnitOfMeasure";

export const deriveHighLevelConversions = (
  lowLevelConversions: readonly UnitConversionTuple[],
  unitsOfMeasureToConvert: readonly UnitOfMeasure[]
) =>
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
          lowLevelConversions.find(([f, t]) => fromUnit === f && toUnit === t)
      );

    const derivedConversions = targetConversions.map(([fromUnit, toUnit]) => {
      const [, , toUnitsPerBaseUnit] = lowLevelConversions.find(
        ([_, baseTo]) => fromUnit === baseTo
      );

      const [, , fromUnitsPerBaseUnit] = lowLevelConversions.find(
        ([_, baseTo]) => toUnit == baseTo
      );

      const fromUnitsPerToUnits = fromUnitsPerBaseUnit / toUnitsPerBaseUnit;
      return [fromUnit, toUnit, fromUnitsPerToUnits];
    });

    return [...acc, ...derivedConversions];
  }, []);
