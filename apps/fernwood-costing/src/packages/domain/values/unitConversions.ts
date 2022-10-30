import type {
  UnitConversion,
  UnitConversionTuple,
} from "../types/UnitConversion";
import { deriveHighLevelConversions } from "./deriveHighLevelConversions";
import { unitsOfMeasureMass, unitsOfMeasureVolume } from "./unitsOfMeasure";

/**
 * For all volumns, use ml as the smallest base unit.
 * For all masses, use grams as the smallest base unit.
 * Then we derive high-level conversions from lower-level ones.
 */
const lowLevelConversionsFromSmallerToBigger: UnitConversionTuple[] = [
  // Low Level Mass Conversions
  ["gram", "kilogram", 1000],
  ["gram", "ounce-mass", 28.346],
  ["gram", "pound", 453.5924],
  // Low Level Volume Conversions
  ["millilitre", "cup-metric", 250],
  ["millilitre", "litre", 1000],
  ["millilitre", "ounce-fluid-us", 29.57],
];

const lowLevelConversionsFromBiggerToSmaller: UnitConversionTuple[] =
  lowLevelConversionsFromSmallerToBigger.map(([from, to, conversion]) => {
    const inverseConversion = 1 / conversion;
    return [to, from, inverseConversion];
  });

const lowLevelConversions = [
  ...lowLevelConversionsFromSmallerToBigger,
  ...lowLevelConversionsFromBiggerToSmaller,
] as const;

const derivedMassConversions: UnitConversion[] = deriveHighLevelConversions(
  lowLevelConversions,
  unitsOfMeasureMass
);

const derivedVolumeConversions: UnitConversion[] = deriveHighLevelConversions(
  lowLevelConversions,
  unitsOfMeasureVolume
);

const allConversions = [
  ...lowLevelConversions,
  ...derivedMassConversions,
  ...derivedVolumeConversions,
] as const;

const allConversionAsObjects = allConversions.map<UnitConversion>((tuple) => ({
  FromUnit: tuple[0],
  ToUnit: tuple[1],
  FromUnitsPerToUnits: tuple[2],
}));

export default allConversionAsObjects;
