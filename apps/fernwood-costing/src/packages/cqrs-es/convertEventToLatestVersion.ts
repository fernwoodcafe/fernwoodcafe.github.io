import type { DomainEvent } from "@packages/cqrs-es-types";
import type { CafeEventUnion } from "@packages/domain/types";

const convertMenuItemEvent = (event: DomainEvent) => {
  const clone = JSON.parse(JSON.stringify(event));
  return {
    ...clone,
    payload: {
      ...clone.payload,
      menuItemComponents: (event.payload as any).menuItemSupplies,
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
