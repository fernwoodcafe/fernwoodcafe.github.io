import type { DomainEntity } from "../../cqrs-es-types/DomainEntity";
import type { MenuItemSupply } from "./MenuItemSupply";

export type MenuItem = DomainEntity & {
  menuItemName: string;
  menuItemSupplies: MenuItemSupply[];
  menuItemPrice: number;
  percentTotalSales: number;
};
