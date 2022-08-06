import type { DomainCommand, DomainEventsRepository, MenuItem } from "@/domain";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type { Materializer } from "./Materializer";

export type Props = {
  menuItems: ReactiveArray<MenuItem>;
  materializeMenuItems: Materializer<ReactiveArray<MenuItem>>;
  domainEventsRepo: DomainEventsRepository;
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

export default async function (
  {
    menuItems: model,
    materializeMenuItems: materializer,
    domainEventsRepo,
  }: Props,
  command: DomainCommand
) {
  if (!commandHandlers[command.type]) {
    return;
  }

  const event = commandHandlers[command.type](command);
  if (event) {
    materializer(model, event);
    domainEventsRepo.insert(event);
  }
}
