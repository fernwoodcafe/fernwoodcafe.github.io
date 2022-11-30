import type { DomainEvent } from "@packages/cqrs-es-types";
import type { CafeEventUnion, MenuItem } from "@packages/domain/types";
import type { MenuItem_v1 } from "@packages/domain/types/MenuItem";

const convertMenuItemEvent = (event: DomainEvent<unknown>): CafeEventUnion => {
  const clone = JSON.parse(JSON.stringify(event));
  return {
    ...clone,
    payload: {
      ...clone.payload,
      menuItemComponents:
        (event.payload as MenuItem)?.menuItemComponents ??
        (event.payload as MenuItem_v1).menuItemSupplies ??
        [],
    },
  };
};

export default (event: CafeEventUnion) => {
  if (event.type === "menu_item_updated") {
    return convertMenuItemEvent(event);
  }

  if (event.type === "menu_item_created") {
    return convertMenuItemEvent(event);
  }

  return event;
};
