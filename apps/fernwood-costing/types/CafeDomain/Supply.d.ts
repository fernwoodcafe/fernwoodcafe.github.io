import { DomainEntity } from ".";

// TODO [should-have] Consider a Supplier type and use supplierId instead.
export type Supply = DomainEntity & {
  supplyName: string;
  supplier: string;
  supplyType: "packaging" | "ingredient";
  supplyUnits: string;
  purchaseQuantity: number;
  purchasePriceBeforeTax: number;
  percentWaste: number;
  hasPST: boolean;
};
