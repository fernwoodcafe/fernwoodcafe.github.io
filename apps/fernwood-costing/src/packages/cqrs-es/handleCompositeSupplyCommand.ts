import type { DomainCommand, DomainEvent } from "@packages/cqrs-es-types";
import type { CompositeSupply } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { Materializer } from "../cqrs-es-types/Materializer";

export type Props = {
  compositeSuppliesList: ReactiveArray<CompositeSupply>;
  materializeCompositeSupplies: Materializer<ReactiveArray<CompositeSupply>>;
};

const commandHandlers = {
  create_composite_supply: (command: DomainCommand) => ({
    type: "composite_supply_created",
    payload: command.payload,
  }),
  update_composite_supply: (command: DomainCommand) => ({
    type: "composite_supply_updated",
    payload: command.payload,
  }),
  delete_composite_supply: (command: DomainCommand) => ({
    type: "composite_supply_deleted",
    payload: command.payload,
  }),
};

export default function (
  { compositeSuppliesList, materializeCompositeSupplies }: Props,
  command: DomainCommand
): DomainEvent[] {
  if (!commandHandlers[command.type]) {
    return [];
  }

  const event = commandHandlers[command.type](command);
  materializeCompositeSupplies(compositeSuppliesList, event);
  return [event];
}
