import { describe, it } from "vitest";
import { calculateSupplyCostPerUnit } from "../services";

describe("when processing valid inputs", () => {
  const supplyTaxes = {
    PST: 0.06,
  };

  const supplyKeys = {
    purchasePriceBeforeTax: 0,
    purchaseQuantity: 0,
    percentWaste: 0,
    hasPST: true,
  };

  it("does not throw", () => {
    // Act
    calculateSupplyCostPerUnit(supplyTaxes, supplyKeys);
  });
});
