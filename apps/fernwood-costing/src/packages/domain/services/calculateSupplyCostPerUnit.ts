import type { InventoryItem } from "@packages/domain/types";

const pst = 0.06;

export default (supply: InventoryItem) => {
  const costAfterPST = supply.hasPST
    ? supply.purchasePriceBeforeTax * (1 + pst)
    : supply.purchasePriceBeforeTax;

  const wasteQuantity = supply.purchaseQuantity * supply.percentWaste;
  const unwastedQuantity = supply.purchaseQuantity - wasteQuantity;

  const effectiveCostPerUnit = costAfterPST / unwastedQuantity;

  return effectiveCostPerUnit;
};
