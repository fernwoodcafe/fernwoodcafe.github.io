import type { DomainCommand, DomainEvent } from "@packages/cqrs-es-types";
import type { Supply } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { Materializer } from "../cqrs-es-types/Materializer";

export type Props = {
  suppliesList: ReactiveArray<Supply>;
  materializeSupplies: Materializer<ReactiveArray<Supply>>;
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

export default function (
  { suppliesList, materializeSupplies }: Props,
  command: DomainCommand
): DomainEvent[] {
  if (!commandHandlers[command.type]) {
    return [];
  }

  const event = commandHandlers[command.type](command);
  materializeSupplies(suppliesList, event);
  return [event];
}
