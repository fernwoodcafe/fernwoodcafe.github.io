import type { DomainEntity } from "./DomainEntity";
import type { UnitOfMeasure } from "./UnitOfMeasure";

export type MenuItemSupply = DomainEntity & {
  menuItemUniqueId: string;
  supplyUniqueId: string;
  menuItemSupplyUnits: UnitOfMeasure;
  menuItemSupplyQuantity: number;
};
