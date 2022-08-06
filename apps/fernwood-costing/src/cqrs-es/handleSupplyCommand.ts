import type { DomainCommand, DomainEventsRepository, Supply } from "@/domain";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type { Materializer } from "./Materializer";

export type Props = {
  supplies: ReactiveArray<Supply>;
  materializeSupplies: Materializer<ReactiveArray<Supply>>;
  domainEventsRepo: DomainEventsRepository;
};

const commandHandlers = {
  create_supply: (command: DomainCommand) => ({
    type: "supply_created",
    payload: command.payload,
  }),
  update_supply: (command: DomainCommand) => ({
    type: "supply_updated",
    payload: command.payload,
  }),
  delete_supply: (command: DomainCommand) => ({
    type: "supply_deleted",
    payload: command.payload,
  }),
};

export default async function (
  { supplies, materializeSupplies, domainEventsRepo }: Props,
  command: DomainCommand
) {
  if (!commandHandlers[command.type]) {
    return;
  }

  const event = commandHandlers[command.type](command);
  if (event) {
    materializeSupplies(supplies, event);
    domainEventsRepo.insert(event);
  }
}
