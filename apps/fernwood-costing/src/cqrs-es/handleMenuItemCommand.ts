import { DomainEventsRepository } from "@/data/DomainEventsRepository";
import type { DomainCommand, MenuItem } from "@/types/CafeDomain";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type { Materializer } from "./Materializer";

export type Props = {
  menuItems: ReactiveArray<MenuItem>;
  materializeMenuItems: Materializer<ReactiveArray<MenuItem>>;
  domainEventsRepo: DomainEventsRepository;
};

export default async function (
  {
    menuItems: model,
    materializeMenuItems: materializer,
    domainEventsRepo,
  }: Props,
  command: DomainCommand
) {
  let eventResult = null;

  console.log(command.type, command.payload);

  if (command.type == "create_menu_item") {
    eventResult = await domainEventsRepo.insert({
      type: "menu_item_created",
      payload: command.payload,
    });
  }

  if (command.type == "update_menu_item") {
    eventResult = await domainEventsRepo.insert({
      type: "menu_item_updated",
      payload: command.payload,
    });
  }

  if (command.type == "delete_menu_item") {
    eventResult = await domainEventsRepo.insert({
      type: "menu_item_deleted",
      payload: command.payload,
    });
  }

  if (command.type == "add_supply_to_menu_item") {
    eventResult = await domainEventsRepo.insert({
      type: "supply_added_to_menu_item",
      payload: command.payload,
    });
  }

  if (command.type == "update_supply_on_menu_item") {
    eventResult = await domainEventsRepo.insert({
      type: "supply_updated_on_menu_item",
      payload: command.payload,
    });
  }

  if (command.type == "remove_supply_from_menu_item") {
    eventResult = await domainEventsRepo.insert({
      type: "supply_removed_from_menu_item",
      payload: command.payload,
    });
  }

  if (eventResult) {
    materializer(model, eventResult);
  }
}
