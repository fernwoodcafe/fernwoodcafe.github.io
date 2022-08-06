import type { UnitOfMeasure } from "./UnitOfMeasure";

export type UnitConversion = {
  From: UnitOfMeasure;
  To: UnitOfMeasure;
  Multiplier: number;
};

export type UnitConversionTuple = [UnitOfMeasure, UnitOfMeasure, number];
