import materializeSupplies from "@/cqrs-es/materializeSupplies";
import { domainEventsRepo, suppliesList } from "../router/index";

export default async function (command: CafeDomain.DomainCommand) {
  let eventResult = null;

  if (command.type == "create_supply") {
    eventResult = await domainEventsRepo.insert({
      type: "supply_created",
      payload: command.payload,
    });
  }

  if (command.type == "update_supply") {
    eventResult = await domainEventsRepo.insert({
      type: "supply_updated",
      payload: command.payload,
    });
  }

  if (command.type == "delete_supply") {
    eventResult = await domainEventsRepo.insert({
      type: "supply_deleted",
      payload: command.payload,
    });
  }

  if (eventResult) {
    materializeSupplies(suppliesList, eventResult);
  }
}
