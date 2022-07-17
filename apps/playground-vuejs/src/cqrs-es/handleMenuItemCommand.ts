import materializeMenuItems from "@/cqrs-es/materializeMenuItems";
import { domainEventsRepo, menuItemsList } from "../router/index";

export default async function (command: CafeDomain.DomainCommand) {
  let eventResult = null;

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

  if (eventResult) {
    materializeMenuItems(menuItemsList, eventResult);
  }
}
