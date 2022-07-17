import materializeMenuItems from "@/cqrs-es/materializeMenuItems";
import materializeSupplies from "@/cqrs-es/materializeSupplies";
import { domainEventsRepo, menuItemsList, suppliesList } from "../router/index";

export async function handleCommand(command) {
  if (command.type == "create_new_menu_item") {
    const event = await domainEventsRepo.insert({
      id: self.crypto.randomUUID(),
      type: "new_menu_item_created",
      payload: command.payload,
    });

    materializeMenuItems(menuItemsList, event);
  }

  if (command.type == "create_new_supply") {
    const event = await domainEventsRepo.insert({
      id: self.crypto.randomUUID(),
      type: "new_supply_created",
      payload: command.payload,
    });

    materializeSupplies(suppliesList, event);
  }

  if (command.type == "update_supply") {
    const event = await domainEventsRepo.insert({
      id: self.crypto.randomUUID(),
      type: "supply_updated",
      payload: command.payload,
    });

    materializeSupplies(suppliesList, event);
  }
}
