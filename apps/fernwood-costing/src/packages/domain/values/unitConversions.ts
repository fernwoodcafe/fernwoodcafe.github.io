import type {
  UnitConversion,
  UnitConversionTuple,
} from "../types/UnitConversion";

// TODO [nice-to-have] Turn this into a conversion tree to reduce duplication.
// For all volumns, use ml as the smallest base unit.
// For all masses, use grams as the smallest base unit.
// Then we can infer high-level conversions from lower-level ones instead of hard coding them all.
const conversionsFromSmallerToBigger: UnitConversionTuple[] = [
  // Low Level Mass Conversions
  ["gram", "kilogram", 1000],
  ["gram", "ounce-mass", 28.346],
  ["gram", "pound", 453.5924],
  // Low Level Volume Conversions
  ["millilitre", "cup-metric", 250],
  ["millilitre", "litre", 1000],
  ["millilitre", "ounce-fluid-us", 29.57],
  // TODO Derived these mass conversions from the low-level ones.
  ["ounce-mass", "kilogram", 35.274],
  ["ounce-mass", "pound", 16],
  ["pound", "kilogram", 2.20462],
  // TODO Derived these volume conversions from the low-level ones.
  ["ounce-fluid-us", "cup-metric", 8.45351],
  ["ounce-fluid-us", "litre", 33.814],
  ["cup-metric", "litre", 4],
];

const conversionsFromBiggerToSmaller: UnitConversionTuple[] =
  conversionsFromSmallerToBigger.map(([from, to, conversion]) => {
    const inverseConversion = 1 / conversion;
    return [to, from, inverseConversion];
  });

const allCoversions = [
  ...conversionsFromSmallerToBigger,
  ...conversionsFromBiggerToSmaller,
] as const;

const allConversionAsObjects = allCoversions.map<UnitConversion>((tuple) => ({
  FromUnit: tuple[0],
  ToUnit: tuple[1],
  Multiplier: tuple[2],
}));

export default allConversionAsObjects;
