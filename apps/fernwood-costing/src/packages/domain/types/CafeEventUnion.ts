import type { DomainEvent } from "@packages/cqrs-es-types";
import type { MenuItem } from "./MenuItem";
import type { MenuItemComponent } from "./MenuItemComponent";
import type { Supply } from "./Supply";

export type CafeEventUnion =
  | DomainEvent<"supply_created", Supply>
  | DomainEvent<"supply_updated", Supply>
  | DomainEvent<"supply_deleted", Supply>
  //
  | DomainEvent<"menu_item_created", MenuItem>
  | DomainEvent<"menu_item_updated", MenuItem>
  | DomainEvent<"menu_item_deleted", MenuItem> // TODO
  //
  | DomainEvent<"supply_added_to_menu_item", MenuItemComponent> // TODO
  | DomainEvent<"supply_updated_on_menu_item", MenuItemComponent>
  | DomainEvent<"supply_removed_from_menu_item", MenuItemComponent>;
