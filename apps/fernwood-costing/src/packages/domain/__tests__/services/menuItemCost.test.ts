import { describe, it } from "vitest";
import { menuItemCost } from "../../services";
import type { MenuItemComponent, Supply, SupplyTaxes } from "../../types";

describe("when processing valid inputs", () => {
  const taxes: SupplyTaxes = { PST: 0.06 };
  const supplies: Supply[] = [];
  const menuItemComponents: MenuItemComponent[] = [];

  it("does not throw", () => {
    // Act
    menuItemCost(taxes, menuItemComponents, supplies);
  });
});
