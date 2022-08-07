import type { DomainEntity } from "../../cqrs-es-types/DomainEntity";
import type { UnitOfMeasure } from "./UnitOfMeasure";

export type InventoryItem = DomainEntity & {
  supplyName: string;
  supplierName: string;
  supplyNotes: string;
  supplyLink: string;
  supplyType: "packaging" | "ingredient";
  supplyUnits: UnitOfMeasure;
  purchaseQuantity: number;
  purchasePriceBeforeTax: number;
  percentWaste: number;
  hasPST: boolean;
};
