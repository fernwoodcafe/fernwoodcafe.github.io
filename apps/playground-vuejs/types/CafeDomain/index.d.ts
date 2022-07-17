import { MenuItem } from "./MenuItem";
import { MenuItemIngredient } from "./MenuItemIngredient";
import { MenuItemPackaging } from "./MenuItemPackaging";
import { MenuItemSupply } from "./MenuItemSupply";

type DomainCommandTypes = "CREATE_NEW_SUPPLY" | "UPDATE_SUPPLY";
type DomainEventTypes = "NEW_SUPPLY_CREATED" | "SUPPLY_UPDATED";

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
