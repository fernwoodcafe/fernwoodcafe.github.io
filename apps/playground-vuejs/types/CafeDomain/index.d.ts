import { MenuItem } from "./MenuItem";
import { MenuItemIngredient } from "./MenuItemIngredient";
import { MenuItemPackaging } from "./MenuItemPackaging";
import { MenuItemSupply } from "./MenuItemSupply";

type DomainCommandTypes =
  | "create_new_supply"
  | "update_supply"
  | "create_new_menu_item"
  | "update_menu_item";

type DomainEventTypes =
  | "new_supply_created"
  | "supply_updated"
  | "new_menu_item_created"
  | "menu_item_updated";

export type DomainCommand = {
  type: DomainCommandTypes;
  payload: Record<string, any>;
  meta?: Record<string, any>;
};

export type DomainEvent = {
  id: string;
  type: DomainEventTypes;
  payload: Record<string, any>;
  meta?: Record<string, any>;
};

export { MenuItem, MenuItemIngredient, MenuItemPackaging, MenuItemSupply };

export as namespace CafeDomain;
