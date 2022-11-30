import type { CafeEventUnion, Supply } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

export default (
  suppliesList: ReactiveArray<Supply>,
  ...events: CafeEventUnion[]
) => {
  events.forEach((event) => {
    if (event.type == "supply_created") {
      suppliesList.items = suppliesList.items.concat(event.payload);
    }

    if (event.type == "supply_updated") {
      suppliesList.items = suppliesList.items.map((oldItem) =>
        oldItem.uniqueId == event.payload.uniqueId ? event.payload : oldItem
      );
    }

    if (event.type == "supply_deleted") {
      suppliesList.items = suppliesList.items.filter(
        (item) => item.uniqueId != event.payload.uniqueId
      );
    }
  });

  return suppliesList;
};
