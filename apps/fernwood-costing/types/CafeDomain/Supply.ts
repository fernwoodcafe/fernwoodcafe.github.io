import { DomainEntity } from ".";

export type Supply = DomainEntity & {
  supplyName: string;
  supplyType: "packaging" | "ingredient";
  supplyUnits: string;
  purchaseQuantity: number;
  purchasePriceBeforeTax: number;
  percentWaste: number;
  hasPST: boolean;
};
