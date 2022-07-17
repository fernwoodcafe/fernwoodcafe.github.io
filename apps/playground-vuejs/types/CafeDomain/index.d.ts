import { MenuItem } from "./MenuItem";
import { MenuItemSupply } from "./MenuItemSupply";
import { Supply } from "./Supply";

export type DomainEntity = {
  uniqueId: string;
};

export type DomainCommandTypes =
  | "create_supply"
  | "update_supply"
  | "create_menu_item"
  | "update_menu_item";

export type DomainEventTypes =
  | "supply_created"
  | "supply_updated"
  | "menu_item_created"
  | "menu_item_updated";

export type DomainCommand<T = any> = {
  type: DomainCommandTypes;
  payload: T;
  meta?: Record<string, any>;
};

export type DomainEvent<T = any> = {
  eventIndex?: number; // autoincremented
  type: DomainEventTypes;
  payload: T;
  meta?: Record<string, any>;
};

export { MenuItem, MenuItemSupply, Supply };

export as namespace CafeDomain;
