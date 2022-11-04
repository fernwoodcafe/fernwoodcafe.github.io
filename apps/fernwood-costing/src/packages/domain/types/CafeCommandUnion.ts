import type { DomainCommand } from "@packages/cqrs-es-types";
import type { CompositeSupply } from "./CompositeSupply";
import type { InventorySheet } from "./InventorySheet";
import type { MenuItem } from "./MenuItem";
import type { MenuItemComponent } from "./MenuItemComponent";
import type { Supply } from "./Supply";

export type CafeCommandUnion =
  | DomainCommand<"create_inventory_sheet", InventorySheet>
  | DomainCommand<"delete_inventory_sheet", InventorySheet>
  | DomainCommand<"update_inventory_sheet", InventorySheet>
  //
  | DomainCommand<"create_supply", Supply>
  | DomainCommand<"update_supply", Supply>
  | DomainCommand<"delete_supply", Supply>
  //
  | DomainCommand<"create_composite_supply", CompositeSupply>
  | DomainCommand<"update_composite_supply", CompositeSupply>
  | DomainCommand<"delete_composite_supply", CompositeSupply>
  //
  | DomainCommand<"create_menu_item", MenuItem>
  | DomainCommand<"update_menu_item", MenuItem>
  | DomainCommand<"delete_menu_item", MenuItem>
  //
  | DomainCommand<"add_supply_to_menu_item", MenuItemComponent>
  | DomainCommand<"update_supply_on_menu_item", MenuItemComponent>
  | DomainCommand<"remove_supply_from_menu_item", MenuItemComponent>;
