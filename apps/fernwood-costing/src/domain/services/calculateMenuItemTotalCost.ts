import type { InventoryItem, MenuItemSupply } from "@/domain/types";
import calculatePerUnitSupplyCost from "./calculatePerUnitSupplyCost";
import convertUnit from "./convertUnit";

export default (
  menuItemSupplies: MenuItemSupply[],
  suppliesList: InventoryItem[]
) =>
  menuItemSupplies
    .map((menuItemSupply) => {
      const targetSupply = suppliesList.find(
        (s) => s.uniqueId == menuItemSupply.supplyUniqueId
      );

      const costPerSupplyUnit = calculatePerUnitSupplyCost(targetSupply);
      const costPerMenuItemUnit =
        menuItemSupply.menuItemSupplyUnits === "-" ||
        targetSupply.supplyUnits === "-"
          ? 0
          : convertUnit(
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
