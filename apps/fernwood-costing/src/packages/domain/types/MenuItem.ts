import type { DomainEntity } from "../../cqrs-es-types/DomainEntity";
import type { MenuItemComponent } from "./MenuItemComponent";

export type MenuItem = DomainEntity & {
  menuItemName: string;
  menuItemComponents: MenuItemComponent[];
  menuItemPrice: number;
  percentTotalSales: number;
};
