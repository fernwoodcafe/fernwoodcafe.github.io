import { CafeGoals } from "./CafeGoals";
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
  //
  | "create_menu_item"
  | "update_menu_item" // TODO
  | "delete_menu_item" // TODO
  //
  | "add_supply_to_menu_item"
  | "update_supply_on_menu_item"
  | "remove_supply_from_menu_item";

export type DomainEventTypes =
  | "supply_created"
  | "supply_updated"
  | "supply_deleted"
  //
  | "menu_item_created"
  | "menu_item_updated"
  | "menu_item_deleted" // TODO
  //
  | "supply_added_to_menu_item" // TODO
  | "supply_updated_on_menu_item"
  | "supply_removed_from_menu_item";

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

export { MenuItem, MenuItemSupply, Supply, CafeGoals };

export as namespace CafeDomain;
