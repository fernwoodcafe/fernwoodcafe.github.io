import type {
  UnitConversion,
  UnitConversionTuple,
} from "../types/UnitConversion";

const smallPerBig: UnitConversionTuple[] = [
  ["gram", "kilogram", 1000],
  ["gram", "pound", 453.5924],
  ["gram", "ounce-mass", 28.346],
  //
  ["pound", "kilogram", 2.20462],
  ["ounce-mass", "pound", 16],
  ["ounce-mass", "kilogram", 35.274],
  //
  ["ounce-fluid-us", "litre", 33.814],
  ["ounce-fluid-us", "millilitre", 0.033814],
  // TODO: Automate the equivalence of these.
  ["item", "item", 1],
  ["slice", "slice", 1],
];

export default smallPerBig
  .reduce((acc, [from, to, conversion]) => {
    const inverseConversion = 1 / conversion;
    acc.push([to, from, inverseConversion]);
    return acc;
  }, smallPerBig)
  .map<UnitConversion>((tuple) => ({
    FromUnit: tuple[0],
    ToUnit: tuple[1],
    Multiplier: tuple[2],
  }));
