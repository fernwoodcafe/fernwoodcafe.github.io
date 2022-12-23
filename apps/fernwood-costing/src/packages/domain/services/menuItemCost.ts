import type {
  MenuItemComponent,
  Supply,
  SupplyTaxes,
  SupplyType
} from "@packages/domain/types";
import joinWithSupplies from "./joinWithSupplies";
import supplyCostPerUnit from "./supplyCostPerUnit";
import valueConvertedToUnit from "./valueConvertedToUnit";

export default (
  supplyTaxes: SupplyTaxes,
  menuItemComponents: readonly MenuItemComponent[],
  suppliesList: readonly Supply[],
  targetSupplyType: SupplyType | "total"
) =>
  menuItemComponents
    .map(joinWithSupplies(suppliesList))
    .filter(
      (menuItemSupply) =>
        targetSupplyType === "total" || menuItemSupply.supplyType === targetSupplyType
    )
    .map((menuItemSupply) => {
      const costPerSupplyUnit = supplyCostPerUnit(supplyTaxes, menuItemSupply);
      const costPerMenuItemUnit =
        menuItemSupply.menuItemSupplyUnits === "-" ||
        menuItemSupply.supplyUnits === "-"
          ? 0
          : valueConvertedToUnit(
              costPerSupplyUnit,
              menuItemSupply.supplyUnits,
              menuItemSupply.menuItemSupplyUnits,
              "inverse-conversion"
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
