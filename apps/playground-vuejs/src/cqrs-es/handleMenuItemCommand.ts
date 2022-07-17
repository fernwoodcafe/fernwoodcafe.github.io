import materializeMenuItems from "@/cqrs-es/materializeMenuItems";
import { domainEventsRepo, menuItemsList } from "../router/index";

export default async function (command: CafeDomain.DomainCommand) {
  let eventResult = null;

  console.log(command.type, command.payload);

  if (command.type == "create_menu_item") {
    eventResult = await domainEventsRepo.insert({
      type: "menu_item_created",
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
    materializeMenuItems(menuItemsList, eventResult);
  }
}
