import { DomainEntity } from "DomainEntity";
import { MenuItemSupply } from "./MenuItemSupply";

export type MenuItem = DomainEntity & {
  menuItemName: string;
  menuItemSupplies: MenuItemSupply[];
};
