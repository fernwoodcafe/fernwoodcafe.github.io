import type { MenuItem } from "../types";

export default (menuItemsInCategory: MenuItem[]) =>
  menuItemsInCategory.reduce((acc, next) => acc + next.percentTotalSales, 0);
