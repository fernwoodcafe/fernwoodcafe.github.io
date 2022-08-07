import type { CafeEventUnion } from "@packages/domain/types";

export default (event: CafeEventUnion) => {
  if (event.type === "menu_item_updated") {
    event.payload = {
      ...event.payload,
      menuItemComponents: (event as any).payload.menuItemSupplies,
    };
  }

  if (event.type === "menu_item_created") {
    event.payload = {
      ...event.payload,
      menuItemComponents: (event as any).payload.menuItemSupplies,
    };
  }

  return event;
};
