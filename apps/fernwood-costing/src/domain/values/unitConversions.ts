import type {
  UnitConversion,
  UnitConversionTuple,
} from "../types/UnitConversion";

const smallPerBig: UnitConversionTuple[] = [
  ["ounce-mass", "pound", 16],
  ["gram", "pound", 453.5924],
  ["gram", "kilogram", 1000],
  ["pound", "kilogram", 2.20462],
  ["ounce-fluid-us", "litre", 33.814],
  ["ounce-fluid-us", "millilitre", 0.033814],
];

export default smallPerBig
  .reduce((acc, [from, to, conversion]) => {
    const inverseConversion = 1 / conversion;
    acc.push([to, from, inverseConversion]);
    return acc;
  }, smallPerBig)
  .map<UnitConversion>((tuple) => ({
    From: tuple[0],
    To: tuple[1],
    Multiplier: tuple[2],
  }));
