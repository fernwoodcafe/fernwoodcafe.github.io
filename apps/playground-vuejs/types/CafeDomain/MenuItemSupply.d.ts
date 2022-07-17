import { DomainEntity } from ".";

export type MenuItemSupply = DomainEntity & {
  supplyUniqueId: string;
  supplyName: string;
};
