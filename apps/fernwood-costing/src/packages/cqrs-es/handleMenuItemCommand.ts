import type { DomainCommand, DomainEvent } from "@packages/cqrs-es-types";
import type { MenuItem } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { Materializer } from "../cqrs-es-types/Materializer";

export type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
  materializeMenuItems: Materializer<ReactiveArray<MenuItem>>;
};

const commandHandlers = {
  create_menu_item: (command: DomainCommand) => ({
    type: "menu_item_created",
    payload: command.payload,
  }),
  update_menu_item: (command: DomainCommand) => ({
    type: "menu_item_updated",
    payload: command.payload,
  }),
  delete_menu_item: (command: DomainCommand) => ({
    type: "menu_item_deleted",
    payload: command.payload,
  }),
  add_supply_to_menu_item: (command: DomainCommand) => ({
    type: "supply_added_to_menu_item",
    payload: command.payload,
  }),
  update_supply_on_menu_item: (command: DomainCommand) => ({
    type: "supply_updated_on_menu_item",
    payload: command.payload,
  }),
  remove_supply_from_menu_item: (command: DomainCommand) => ({
    type: "supply_removed_from_menu_item",
    payload: command.payload,
  }),
};

export default function (
  { menuItemsList, materializeMenuItems }: Props,
  command: DomainCommand
): DomainEvent[] {
  if (!commandHandlers[command.type]) {
    return [];
  }

  const event = commandHandlers[command.type](command);
  materializeMenuItems(menuItemsList, event);
  return [event];
}
