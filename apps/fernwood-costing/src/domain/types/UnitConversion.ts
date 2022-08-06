import type { UnitOfMeasure } from "./UnitOfMeasure";

export type UnitConversion = {
  From: UnitOfMeasure;
  To: UnitOfMeasure;
  Conversion: number;
};

export type UnitConversionTuple = [UnitOfMeasure, UnitOfMeasure, number];
