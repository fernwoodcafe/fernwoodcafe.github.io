import { MenuItem } from "./MenuItem";
import { MenuItemSupply } from "./MenuItemSupply";
import { Supply } from "./Supply";

export type DomainEntity = {
  uniqueId: string;
};

export type DomainCommandTypes =
  | "create_supply"
  | "update_supply"
  | "delete_supply"
  | "create_menu_item"
  | "update_menu_item"
  | "update_menu_item_supply"
  | "delete_menu_item_supply";

export type DomainEventTypes =
  | "supply_created"
  | "supply_updated"
  | "supply_deleted"
  | "menu_item_created"
  | "menu_item_updated"
  | "menu_item_supply_updated"
  | "menu_item_supply_deleted";

// TODO Make these into a discriminated union to aid type narrowing.
export type DomainCommand<T = any> = {
  type: DomainCommandTypes;
  payload: T;
  meta?: Record<string, any>;
};

// TODO Make these into a discriminated union to aid type narrowing.
export type DomainEvent<T = any> = {
  eventIndex?: number; // autoincremented
  type: DomainEventTypes;
  payload: T;
  meta?: Record<string, any>;
};

export { MenuItem, MenuItemSupply, Supply };

export as namespace CafeDomain;
