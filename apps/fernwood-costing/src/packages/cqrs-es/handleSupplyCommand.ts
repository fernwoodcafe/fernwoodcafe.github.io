import type { DomainCommand, DomainEvent } from "@packages/cqrs-es-types";
import type { CafeSupply } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { Materializer } from "../cqrs-es-types/Materializer";

export type Props = {
  supplies: ReactiveArray<CafeSupply>;
  materializeSupplies: Materializer<ReactiveArray<CafeSupply>>;
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
  { supplies, materializeSupplies }: Props,
  command: DomainCommand
): DomainEvent[] {
  if (!commandHandlers[command.type]) {
    return [];
  }

  const event = commandHandlers[command.type](command);
  materializeSupplies(supplies, event);
  return [event];
}
