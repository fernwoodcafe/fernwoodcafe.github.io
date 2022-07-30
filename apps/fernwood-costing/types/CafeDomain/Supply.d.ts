import { DomainEntity } from "DomainEntity";

// TODO [should-have] Consider a Supplier type and use supplierId instead.
export type Supply = DomainEntity & {
  supplyName: string;
  supplierUniqueId: string;
  supplyNotes: string;
  supplyType: "packaging" | "ingredient";
  supplyUnits: string;
  purchaseQuantity: number;
  purchasePriceBeforeTax: number;
  percentWaste: number;
  hasPST: boolean;
};
