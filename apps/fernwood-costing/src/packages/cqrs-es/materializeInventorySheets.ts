import type { CafeEventUnion, InventorySheet } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

export default (
  inventorySheetsList: ReactiveArray<InventorySheet>,
  ...events: CafeEventUnion[]
) => {
  events.forEach((event) => {
    if (event.type == "inventory_sheet_created") {
      inventorySheetsList.items.push(event.payload);
    }
  });

  return inventorySheetsList;
};
