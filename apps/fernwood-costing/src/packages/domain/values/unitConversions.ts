import type {
  UnitConversion,
  UnitConversionTuple,
} from "../types/UnitConversion";

const conversionsFromSmallerToBigger: UnitConversionTuple[] = [
  ["gram", "kilogram", 1000],
  ["gram", "ounce-mass", 28.346],
  ["gram", "pound", 453.5924],
  ["millilitre", "litre", 1000],
  ["ounce-fluid-us", "litre", 33.814],
  ["ounce-fluid-us", "millilitre", 0.033814],
  ["ounce-mass", "kilogram", 35.274],
  ["ounce-mass", "pound", 16],
  ["pound", "kilogram", 2.20462],
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

export default allCoversions.map<UnitConversion>((tuple) => ({
  FromUnit: tuple[0],
  ToUnit: tuple[1],
  Multiplier: tuple[2],
}));
