import { DomainEntity } from "DomainEntity";

export type Supply = DomainEntity & {
  supplyName: string;
  supplierName: string;
  supplyNotes: string;
  supplyType: "packaging" | "ingredient";
  supplyUnits: string;
  purchaseQuantity: number;
  purchasePriceBeforeTax: number;
  percentWaste: number;
  hasPST: boolean;
};
