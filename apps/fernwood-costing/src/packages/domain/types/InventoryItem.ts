import type { DomainEntity } from "@packages/cqrs-es-types/DomainEntity";
import type { UnitOfMeasure } from "./UnitOfMeasure";

export type InventoryItem = DomainEntity & {
  supplyName: string;
  supplyUnits: UnitOfMeasure;
  quantityOnHand: number;
  purchaseQuantity: number;
  purchasePriceBeforeTax: number;
};
