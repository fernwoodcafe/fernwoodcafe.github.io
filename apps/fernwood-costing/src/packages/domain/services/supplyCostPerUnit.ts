import type { Supply, SupplyTaxes } from "../types";

type SupplyKeys =
  | "purchasePriceBeforeTax"
  | "purchaseQuantity"
  | "percentWaste"
  | "hasPST";

type SupplyArg = Pick<Supply, SupplyKeys>;

export default (supplyTaxes: SupplyTaxes, supply: SupplyArg) => {
  const costAfterPST = supply.hasPST
    ? supply.purchasePriceBeforeTax * (1 + supplyTaxes.PST)
    : supply.purchasePriceBeforeTax;

  const wasteQuantity = supply.purchaseQuantity * supply.percentWaste;
  const unwastedQuantity = supply.purchaseQuantity - wasteQuantity;

  const effectiveCostPerUnit = costAfterPST / unwastedQuantity;

  return effectiveCostPerUnit;
};
