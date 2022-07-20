import type { MenuItem, Supply } from "@/types/CafeDomain";
import calculatePerUnitSupplyCost from "./calculatePerUnitSupplyCost";
import convertUnitCost from "./convertUnitCost";

export default (menuItem: MenuItem, suppliesList: Supply[]) =>
  menuItem.menuItemSupplies
    .map((menuItemSupply) => {
      const targetSupply = suppliesList.find(
        (s) => s.uniqueId == menuItemSupply.supplyUniqueId
      );

      const costPerSupplyUnit = calculatePerUnitSupplyCost(targetSupply);
      const costPerMenuItemUnit = convertUnitCost(
        costPerSupplyUnit,
        targetSupply.supplyUnits,
        menuItemSupply.menuItemSupplyUnits
      );

      return {
        unitCost: costPerMenuItemUnit,
        ...menuItemSupply,
      };
    })
    .reduce(
      (acc, next) => acc + next.menuItemSupplyQuantity * next.unitCost,
      0
    );
