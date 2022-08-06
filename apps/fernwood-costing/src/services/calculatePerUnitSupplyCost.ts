import type { Supply } from "@/domain";

const pst = 0.06;

export default (supply: Supply) => {
  const costAfterPST = supply.hasPST
    ? supply.purchasePriceBeforeTax * (1 + pst)
    : supply.purchasePriceBeforeTax;

  const wasteQuantity = supply.purchaseQuantity * supply.percentWaste;
  const unwastedQuantity = supply.purchaseQuantity - wasteQuantity;

  const effectiveCostPerUnit = costAfterPST / unwastedQuantity;

  console.log(
    "calculatePerUnitSupplyCost",
    JSON.stringify(
      {
        hasPST: supply.hasPST,
        purchasePriceBeforeTax: supply.purchasePriceBeforeTax,
        costAfterPST,
        purchaseQuantity: supply.purchaseQuantity,
        percentWaste: supply.percentWaste,
        wasteQuantity,
        unwastedQuantity,
      },
      undefined,
      2
    )
  );

  return effectiveCostPerUnit;
};
