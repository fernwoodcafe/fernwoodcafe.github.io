import type { DomainEventsRepository } from "@/data/DomainEventsRepo";
import type { DomainCommand, Supply } from "@/types/CafeDomain";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type { Materializer } from "./Materializer";

export type Props = {
  supplies: ReactiveArray<Supply>;
  materializeSupplies: Materializer<ReactiveArray<Supply>>;
  domainEventsRepo: DomainEventsRepository;
};

export default async function (
  { supplies, materializeSupplies, domainEventsRepo }: Props,
  command: DomainCommand
) {
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
    materializeSupplies(supplies, eventResult);
  }
}
