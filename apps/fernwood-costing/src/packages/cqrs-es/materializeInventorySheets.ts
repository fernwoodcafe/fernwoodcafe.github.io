import type { CafeEventUnion, InventorySheet } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

const parseStringifiedDate = (input: Date | string): Date => {
  if (input) {
    return new Date(input);
  }

  return null;
};

export default (
  inventorySheetsList: ReactiveArray<InventorySheet>,
  ...events: CafeEventUnion[]
) => {
  // TODO Consider using a chain-of-responsibility pattern here, to ease
  // maintanance as the quantity of events and commands grow.
  events.forEach((event) => {
    if (event.type == "inventory_sheet_created") {
      const inventory: InventorySheet = {
        uniqueId: event.payload.uniqueId,
        dateStarted: parseStringifiedDate(event.payload.dateStarted),
        dateCompleted: parseStringifiedDate(event.payload.dateCompleted),
        inventoryItems: event.payload.inventoryItems,
      };

      inventorySheetsList.items.push(inventory);
    }

    if (event.type == "inventory_sheet_deleted") {
      inventorySheetsList.items = inventorySheetsList.items.filter(
        (item) => item.uniqueId != event.payload.uniqueId
      );
    }

    if (event.type == "inventory_sheet_updated") {
      inventorySheetsList.items = inventorySheetsList.items.map((oldItem) =>
        oldItem.uniqueId == event.payload.uniqueId ? event.payload : oldItem
      );
    }
  });

  return inventorySheetsList;
};
