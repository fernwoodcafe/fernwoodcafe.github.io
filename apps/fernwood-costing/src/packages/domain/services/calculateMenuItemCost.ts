import type {
  CafeSupply,
  CafeSupplyTaxes,
  MenuItemComponent,
} from "@packages/domain/types";
import calculateSupplyCostPerUnit from "./calculateSupplyCostPerUnit";
import convertUnit from "./convertUnit";

export default (
  supplyTaxes: CafeSupplyTaxes,
  menuItemComponents: MenuItemComponent[],
  suppliesList: CafeSupply[]
) =>
  menuItemComponents
    .map((menuItemSupply) => {
      const targetSupply = suppliesList.find(
        (s) => s.uniqueId == menuItemSupply.supplyUniqueId
      );

      const costPerSupplyUnit = calculateSupplyCostPerUnit(
        supplyTaxes,
        targetSupply
      );
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
