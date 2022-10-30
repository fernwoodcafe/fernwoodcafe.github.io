import type { UnitConversion } from "../types/UnitConversion";
import type { UnitOfMeasure } from "../types/UnitOfMeasure";

export const deriveHighLevelConversions = (
  baseConversions: readonly UnitConversion[],
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
          baseConversions.find(
            (low) => low.FromUnit === fromUnit && low.ToUnit === toUnit
          )
      );

    /**
     * @example
     * [pounds, kilograms]
     * fromBase = 453.5924 gram/pound
     * toBase = 1000 gram/kilogram
     * conversionFactor
     *     = (1000 gram/kilogram) / (453.5924 gram/pound)
     *     = (1000 gram/kilogram) * (0.00220462247 pound/gram)
     *     = (1000 * 0.00220462247) pound/kilogram
     *     = 2.20462247 pound/kilogram
     */
    const derivedConversions = targetConversions.map<UnitConversion>(
      ([fromUnit, toUnit]) => {
        const fromBase = baseConversions.find(
          (base) => fromUnit == base.ToUnit
        );

        const toBase = baseConversions.find((base) => toUnit === base.ToUnit);

        const conversionFactor =
          toBase.ConversionFactor / fromBase.ConversionFactor;

        const unitConversion: UnitConversion = {
          FromUnit: fromUnit,
          ToUnit: toUnit,
          ConversionFactor: conversionFactor,
        };

        return unitConversion;
      }
    );

    return [...acc, ...derivedConversions];
  }, []);
