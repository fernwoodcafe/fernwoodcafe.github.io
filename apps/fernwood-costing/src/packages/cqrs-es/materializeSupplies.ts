import type { CafeEventUnion, CafeSupply } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

export default (
  suppliesList: ReactiveArray<CafeSupply>,
  ...events: CafeEventUnion[]
) => {
  events.forEach((event) => {
    console.log("materializeSupplies", event.type);

    if (event.type == "supply_created") {
      suppliesList.items.push(event.payload);
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
