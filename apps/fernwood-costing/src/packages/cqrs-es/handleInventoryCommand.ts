import type { DomainCommand, DomainEvent } from "@packages/cqrs-es-types";
import type { InventorySheet } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { Materializer } from "../cqrs-es-types/Materializer";

export type Props = {
  inventorySheetsList: ReactiveArray<InventorySheet>;
  materializeInventorySheets: Materializer<ReactiveArray<InventorySheet>>;
};

const commandHandlers = {
  create_inventory_sheet: (command: DomainCommand) => ({
    type: "inventory_sheet_created",
    payload: command.payload,
  }),
};

export default function (
  { inventorySheetsList, materializeInventorySheets }: Props,
  command: DomainCommand
): DomainEvent[] {
  if (!commandHandlers[command.type]) {
    return [];
  }

  const event = commandHandlers[command.type](command);
  materializeInventorySheets(inventorySheetsList, event);
  return [event];
}
