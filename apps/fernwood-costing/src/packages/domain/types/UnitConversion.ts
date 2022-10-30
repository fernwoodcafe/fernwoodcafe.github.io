import type { UnitOfMeasure } from "./UnitOfMeasure";

/**
 * The quantity of source units to destination units.
 * @example
 * FromUnit: gram
 * ToUnit: kilogram
 * FromUnitsPerToUnits: 1000
 */
export type UnitConversion = {
  FromUnit: UnitOfMeasure;
  ToUnit: UnitOfMeasure;
  /**
   * The quantity of source units to destination units.
   */
  FromUnitsPerToUnits: number;
};

export type UnitConversionTuple = [UnitOfMeasure, UnitOfMeasure, number];
