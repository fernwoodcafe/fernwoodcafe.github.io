import { describe, it } from "vitest";
import { menuItemCost } from "../services";
import type { CafeSupply, CafeSupplyTaxes, MenuItemComponent } from "../types";

describe("when processing valid inputs", () => {
  const taxes: CafeSupplyTaxes = { PST: 0.06 };
  const supplies: CafeSupply[] = [];
  const menuItemComponents: MenuItemComponent[] = [];

  it("does not throw", () => {
    // Act
    menuItemCost(taxes, menuItemComponents, supplies);
  });
});
