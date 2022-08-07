import { describe, it } from "vitest";
import { calculateMenuItemCost } from "../services";
import type { CafeSupply, CafeSupplyTaxes, MenuItemComponent } from "../types";

describe("when processing valid inputs", () => {
  const taxes: CafeSupplyTaxes = { PST: 0.06 };
  const supplies: CafeSupply[] = [];
  const menuItemComponents: MenuItemComponent[] = [];

  it("does not throw", () => {
    // Act
    calculateMenuItemCost(taxes, menuItemComponents, supplies);
  });
});
