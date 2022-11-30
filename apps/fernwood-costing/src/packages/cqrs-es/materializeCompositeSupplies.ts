import type { CafeEventUnion, CompositeSupply } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

export default (
  compositeSuppliesList: ReactiveArray<CompositeSupply>,
  ...events: CafeEventUnion[]
) => {
  events.forEach((event) => {
    if (event.type == "composite_supply_created") {
      compositeSuppliesList.items = compositeSuppliesList.items.concat(
        event.payload
      );
    }

    if (event.type == "composite_supply_updated") {
      compositeSuppliesList.items = compositeSuppliesList.items.map(
        (compositeSupply) => {
          if (compositeSupply.uniqueId !== event.payload.uniqueId) {
            return compositeSupply;
          }

          return event.payload;
        }
      );
    }

    if (event.type == "composite_supply_deleted") {
      compositeSuppliesList.items = compositeSuppliesList.items.filter(
        (item) => item.uniqueId != event.payload.uniqueId
      );
    }
  });

  return compositeSuppliesList;
};
