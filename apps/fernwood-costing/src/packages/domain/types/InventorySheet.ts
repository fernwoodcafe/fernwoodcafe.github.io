import type { DomainEntity } from "@packages/cqrs-es-types/DomainEntity";
import type { InventoryItem } from "./InventoryItem";

export type InventorySheet = DomainEntity & {
  dateCompleted: Date;
  items: InventoryItem[];
};