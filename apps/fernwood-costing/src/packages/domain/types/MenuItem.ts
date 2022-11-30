import type { DomainEntity } from "../../cqrs-es-types/DomainEntity";
import type { MenuItemComponent } from "./MenuItemComponent";

// TODO Consider refactoring this into two types: MenuItem and MenuItemRecipe.
export type MenuItem = DomainEntity & {
  menuItemName: string;
  menuItemComponents: MenuItemComponent[];
  menuItemPrice: number;
  menuItemServingsPerRecipe: number;
  percentTotalSales: number;
};

export type MenuItem_v1 = Omit<MenuItem, "menuItemComponents"> & {
  menuItemSupplies: unknown[];
};
