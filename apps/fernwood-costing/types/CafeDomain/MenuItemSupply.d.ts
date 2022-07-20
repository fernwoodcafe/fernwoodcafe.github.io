import { DomainEntity } from ".";

export type MenuItemSupply = DomainEntity & {
  menuItemUniqueId: string;
  supplyUniqueId: string;
  menuItemSupplyUnits: string;
  menuItemSupplyQuantity: number;
};
