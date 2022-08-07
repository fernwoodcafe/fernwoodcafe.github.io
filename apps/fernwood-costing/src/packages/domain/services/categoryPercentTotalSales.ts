import type { MenuItem } from "../types";

export default (menuItemsInCategory: MenuItem[]) =>
  menuItemsInCategory
    .filter((menuItem) => menuItem.percentTotalSales)
    .reduce((acc, next) => acc + next.percentTotalSales, 0);
