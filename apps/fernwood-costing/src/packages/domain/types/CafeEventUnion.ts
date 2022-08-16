import type { DomainEvent } from "@packages/cqrs-es-types";
import type { CompositeSupply } from "./CompositeSupply";
import type { MenuItem } from "./MenuItem";
import type { MenuItemComponent } from "./MenuItemComponent";
import type { Supply } from "./Supply";

export type CafeEventUnion =
  | DomainEvent<"supply_created", Supply>
  | DomainEvent<"supply_updated", Supply>
  | DomainEvent<"supply_deleted", Supply>
  //
  | DomainEvent<"composite_supply_created", CompositeSupply>
  | DomainEvent<"composite_supply_updated", CompositeSupply>
  | DomainEvent<"composite_supply_deleted", CompositeSupply>
  //
  | DomainEvent<"menu_item_created", MenuItem>
  | DomainEvent<"menu_item_updated", MenuItem>
  | DomainEvent<"menu_item_deleted", MenuItem>
  //
  | DomainEvent<"supply_added_to_menu_item", MenuItemComponent>
  | DomainEvent<"supply_updated_on_menu_item", MenuItemComponent>
  | DomainEvent<"supply_removed_from_menu_item", MenuItemComponent>;
