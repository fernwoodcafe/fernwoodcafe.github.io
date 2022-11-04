import type { DomainEntity } from "@packages/cqrs-es-types/DomainEntity";
import type { InventoryItem } from "./InventoryItem";

export type InventorySheet = DomainEntity & {
  // TODO [tech-debt] Separate type for the serialized and deserialized Date properties.
  dateStarted: Date | string;
  dateCompleted: Date | string;
  inventoryItems: InventoryItem[];
};
