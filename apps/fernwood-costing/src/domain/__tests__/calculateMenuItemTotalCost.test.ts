import { expect } from "chai";
import { describe, it } from "vitest";
import { calculateMenuItemTotalCost } from "../services";
import type { InventoryItem, MenuItemSupply } from "../types";

describe("when receiving valid arguments", () => {
  const inventoryItems: InventoryItem[] = [];
  const menuItemSupplies: MenuItemSupply[] = [];

  it("does not throw", () => {
    // Act
    const result = calculateMenuItemTotalCost(menuItemSupplies, inventoryItems);
    // Assert
    expect(result).not.null;
  });
});
