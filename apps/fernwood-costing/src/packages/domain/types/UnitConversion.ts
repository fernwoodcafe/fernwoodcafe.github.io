import type { UnitOfMeasure } from "./UnitOfMeasure";

export type UnitConversion = {
  FromUnit: UnitOfMeasure;
  ToUnit: UnitOfMeasure;
  Multiplier: number;
};

export type UnitConversionTuple = [UnitOfMeasure, UnitOfMeasure, number];
