import { describe, it } from "vitest";
import { calculateMenuItemCost } from "../services";
import type { InventoryItem, MenuItemSupply } from "../types";

describe("when processing valid inputs", () => {
  const inventoryItems: InventoryItem[] = [];
  const menuItemSupplies: MenuItemSupply[] = [];

  it("does not throw", () => {
    // Act
    calculateMenuItemCost(menuItemSupplies, inventoryItems);
  });
});
