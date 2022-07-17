import { DomainEntity } from ".";

export type Supply = DomainEntity & {
  supplyName: string;
  supplyType: "packaging" | "ingredient";
  unitSize: string;
  unitCost: number;
};
