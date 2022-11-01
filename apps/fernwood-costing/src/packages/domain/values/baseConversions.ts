import type { UnitConversion } from "../types/UnitConversion";
import type { UnitOfMeasure } from "../types/UnitOfMeasure";

export type UnitConversionTuple = [UnitOfMeasure, UnitOfMeasure, number];

/**
 * For all volumns, use ml as the smallest base unit.
 * For all masses, use grams as the smallest base unit.
 * Then we derive high-level conversions from lower-level ones.
 */
const conversionsFromSmallerToBigger: UnitConversionTuple[] = [
  // Low Level Mass Conversions
  ["gram", "kilogram", 1000],
  ["gram", "ounce-mass", 28.3495],
  ["gram", "pound", 453.5924],
  // Low Level Volume Conversions
  ["millilitre", "cup-metric", 250],
  ["millilitre", "litre", 1000],
  ["millilitre", "ounce-fluid-us", 29.57],
  ["millilitre", "teaspoon-us", 4.92892],
  ["millilitre", "tablespoon-us", 14.7868],
];

const conversionsFromBiggerToSmaller: UnitConversionTuple[] =
  conversionsFromSmallerToBigger.map(([from, to, conversion]) => {
    const inverseConversion = 1 / conversion;
    return [to, from, inverseConversion];
  });

const conversions = [
  ...conversionsFromSmallerToBigger,
  ...conversionsFromBiggerToSmaller,
] as const;

export default conversions.map<UnitConversion>((tuple) => ({
  FromUnit: tuple[0],
  ToUnit: tuple[1],
  ConversionFactor: tuple[2],
}));