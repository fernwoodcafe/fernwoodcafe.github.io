import { DomainEntity } from ".";

export type MenuItemSupply = DomainEntity & {
  menuItemUniqueId: string;
  supplyUniqueId: string;
  supplyName: string;
};
