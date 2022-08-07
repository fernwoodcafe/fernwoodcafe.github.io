import type { DomainCommand, DomainEvent, Supply } from "@/domain/types";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type { Materializer } from "./Materializer";

export type Props = {
  supplies: ReactiveArray<Supply>;
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
