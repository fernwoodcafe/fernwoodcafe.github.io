import type { MenuItem, Supply } from "@/types/CafeDomain";

export default (menuItem: MenuItem, suppliesList: Supply[]) =>
  menuItem.menuItemSupplies
    .map((menuItemSupply) => {
      const target = suppliesList.find(
        (s) => s.uniqueId == menuItemSupply.supplyUniqueId
      );

      const unitPrice =
        target == null
          ? 0
          : target.purchasePriceBeforeTax / target.purchaseQuantity;

      return {
        unitPrice,
        ...menuItemSupply,
      };
    })
    .reduce((acc, next) => acc + next.supplyQuantity * next.unitPrice, 0);
