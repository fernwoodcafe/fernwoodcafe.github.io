import type { UnitConversion } from "../types/UnitConversion";
import { deriveHighLevelConversions } from "./deriveHighLevelConversions";
import { lowLevelConversions } from "./lowLevelConversions";
import { unitsOfMeasureMass, unitsOfMeasureVolume } from "./unitsOfMeasure";

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
