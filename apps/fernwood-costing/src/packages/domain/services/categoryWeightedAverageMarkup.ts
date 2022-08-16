import type { MenuItem, Supply, SupplyTaxes } from "../types";
import categoryPercentTotalSales from "./categoryPercentTotalSales";
import menuItemCost from "./menuItemCost";
import menuItemMarkup from "./menuItemMarkup";
import menuItemPercentCategorySales from "./menuItemPercentCategorySales";
import menuItemWeightedMarkup from "./menuItemWeightedMarkup";

const doIncludeMenuItemCategoryCostAnalysis = (menuItem: MenuItem) =>
  menuItem.percentTotalSales && menuItem.menuItemComponents.length > 0;

export default (
  supplyTax: SupplyTaxes,
  suppliesList: Supply[],
  menuItemsList: MenuItem[]
) =>
  menuItemsList
    .filter(doIncludeMenuItemCategoryCostAnalysis)
    .reduce((acc, next) => {
      const cost = menuItemCost(
        supplyTax,
        next.menuItemComponents,
        suppliesList
      );
      const markup = menuItemMarkup(next.menuItemPrice, cost);
      const categoryPercent = categoryPercentTotalSales(menuItemsList);
      const percentCategory = menuItemPercentCategorySales(
        next.percentTotalSales,
        categoryPercent
      );

      const weightedMarkup = menuItemWeightedMarkup(markup, percentCategory);

      return acc + weightedMarkup;
    }, 0);
