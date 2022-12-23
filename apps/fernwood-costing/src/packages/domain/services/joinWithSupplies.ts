import type { MenuItemComponent, Supply } from "../types";

export type Joined = MenuItemComponent & Supply;

export default (suppliesList: readonly Supply[]) =>
  (menuItemComponent: MenuItemComponent): Joined => {
    const targetSupply = suppliesList.find(
      (supply) => supply.uniqueId == menuItemComponent.supplyUniqueId
    );

    return {
      ...targetSupply,
      ...menuItemComponent,
    };
  };
