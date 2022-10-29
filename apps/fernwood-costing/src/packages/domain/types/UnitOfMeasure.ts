import type { unitsOfMeasure } from "../values";
import {
  unitsOfMeasureItem,
  unitsOfMeasureMass,
  unitsOfMeasureVolume,
} from "../values/unitsOfMeasure";

export type UnitOfMeasure = typeof unitsOfMeasure[number];
export type UnitOfMeasureMass = typeof unitsOfMeasureMass[number];
export type UnitOfMeasureVolumne = typeof unitsOfMeasureVolume[number];
export type UnitOfMeasureItem = typeof unitsOfMeasureItem[number];

export const isMass = (
  input: unknown
): input is typeof unitsOfMeasureMass[number] =>
  unitsOfMeasureMass.includes(input as UnitOfMeasureMass);

export const isVolume = (
  input: unknown
): input is typeof unitsOfMeasureMass[number] => {
  return unitsOfMeasureVolume.includes(input as UnitOfMeasureVolumne);
};

export const isItem = (
  input: unknown
): input is typeof unitsOfMeasureItem[number] => {
  return unitsOfMeasureItem.includes(input as UnitOfMeasureItem);
};
