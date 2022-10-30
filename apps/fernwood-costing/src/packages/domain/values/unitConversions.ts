import type { UnitConversion } from "../types/UnitConversion";
import baseConversions from "./baseConversions";
import { deriveHighLevelConversions } from "./derivedConversions";
import { unitsOfMeasureMass, unitsOfMeasureVolume } from "./unitsOfMeasure";

const derivedMassConversions: UnitConversion[] = deriveHighLevelConversions(
  baseConversions,
  unitsOfMeasureMass
);

const derivedVolumeConversions: UnitConversion[] = deriveHighLevelConversions(
  baseConversions,
  unitsOfMeasureVolume
);

const allConversions = [
  ...baseConversions,
  ...derivedMassConversions,
  ...derivedVolumeConversions,
] as const;

export default allConversions;
