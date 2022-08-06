import type { DomainEntity } from "./DomainEntity";

export type MenuItemSupply = DomainEntity & {
  menuItemUniqueId: string;
  supplyUniqueId: string;
  menuItemSupplyUnits: string;
  menuItemSupplyQuantity: number;
};
