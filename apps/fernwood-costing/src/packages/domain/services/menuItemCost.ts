import type {
  CafeSupply,
  CafeSupplyTaxes,
  MenuItemComponent,
} from "@packages/domain/types";
import supplyCostPerUnit from "./supplyCostPerUnit";
import valueConvertedToUnit from "./valueConvertedToUnit";

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

      const costPerSupplyUnit = supplyCostPerUnit(supplyTaxes, targetSupply);
      const costPerMenuItemUnit =
        menuItemSupply.menuItemSupplyUnits === "-" ||
        targetSupply.supplyUnits === "-"
          ? 0
          : valueConvertedToUnit(
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