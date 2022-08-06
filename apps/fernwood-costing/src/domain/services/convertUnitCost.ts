import convertUnit from "./convertUnit";

export default (cost: number, fromUnit: string, toUnit: string) =>
  cost * convertUnit(1, fromUnit, toUnit);
