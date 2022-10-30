import type { UnitConversion } from "../types/UnitConversion";
import { deriveHighLevelConversions } from "./deriveHighLevelConversions";
import lowLevelConversions from "./lowLevelConversions";
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

export default allConversions;
