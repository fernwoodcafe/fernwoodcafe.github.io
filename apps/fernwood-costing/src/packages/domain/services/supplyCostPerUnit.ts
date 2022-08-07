import type { CafeSupply, CafeSupplyTaxes } from "../types";

type CafeSupplyKeys =
  | "purchasePriceBeforeTax"
  | "purchaseQuantity"
  | "percentWaste"
  | "hasPST";

type CafeSupplyArg = Pick<CafeSupply, CafeSupplyKeys>;

export default (supplyTaxes: CafeSupplyTaxes, supply: CafeSupplyArg) => {
  const costAfterPST = supply.hasPST
    ? supply.purchasePriceBeforeTax * (1 + supplyTaxes.PST)
    : supply.purchasePriceBeforeTax;

  const wasteQuantity = supply.purchaseQuantity * supply.percentWaste;
  const unwastedQuantity = supply.purchaseQuantity - wasteQuantity;

  const effectiveCostPerUnit = costAfterPST / unwastedQuantity;

  return effectiveCostPerUnit;
};
