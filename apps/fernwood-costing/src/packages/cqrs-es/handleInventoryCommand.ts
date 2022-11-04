import type { DomainCommand, DomainEvent } from "@packages/cqrs-es-types";
import type { InventorySheet } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { Materializer } from "../cqrs-es-types/Materializer";

export type Props = {
  inventorySheetsList: ReactiveArray<InventorySheet>;
  materializeInventorySheets: Materializer<ReactiveArray<InventorySheet>>;
};

/**
 * TODO Add command validation. E.g., only delete inventory sheets that exist.
 * That might entail also narrowing the type of the `DomainCommand` in the handler.
 */
const commandHandlers = {
  create_inventory_sheet: (command: DomainCommand) => ({
    type: "inventory_sheet_created",
    payload: command.payload,
  }),
  delete_inventory_sheet: (command: DomainCommand) => ({
    type: "inventory_sheet_deleted",
    payload: command.payload,
  }),
  update_inventory_sheet: (command: DomainCommand) => ({
    type: "inventory_sheet_updated",
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
