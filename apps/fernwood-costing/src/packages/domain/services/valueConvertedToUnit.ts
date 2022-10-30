import type { UnitOfMeasure } from "../types/UnitOfMeasure";
import unitConversions from "../values/unitConversions";

/**
 * @param strategy - Use the 'inverse-conversion' strategy for 'per-unit' conversions.
 * For example, converting 'dollars per pounds' to 'dollars per gram' uses this flag.
 */
export default (
  fromValue: number,
  fromUnit: UnitOfMeasure,
  toUnit: UnitOfMeasure,
  strategy: "inverse-conversion" | null = null
) => {
  if (!fromUnit || !toUnit || fromUnit === toUnit) {
    return fromValue;
  }

  const conversion = unitConversions.find(
    (conversion) =>
      conversion.FromUnit === fromUnit && conversion.ToUnit === toUnit
  );

  if (!conversion) {
    // TODO Warn the user that updates to the menu item need to happen.
    console.error(`No conversion found for '${fromUnit}' to '${toUnit}'`);
    return fromValue;
  }

  if (strategy === "inverse-conversion") {
    return fromValue * conversion.FromUnitsPerToUnits;
  }

  return fromValue / conversion.FromUnitsPerToUnits;
};
