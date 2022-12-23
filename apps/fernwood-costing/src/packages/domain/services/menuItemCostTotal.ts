import type {
  MenuItemComponent,
  Supply,
  SupplyTaxes
} from "@packages/domain/types";
import menuItemCost from './menuItemCost';

export default (
  supplyTaxes: SupplyTaxes,
  menuItemComponents: readonly MenuItemComponent[],
  suppliesList: readonly Supply[]
) => menuItemCost(
  supplyTaxes,
  menuItemComponents,
  suppliesList,
  'total'
)
