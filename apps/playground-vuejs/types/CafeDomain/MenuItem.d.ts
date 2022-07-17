import { MenuItemIngredient } from "./MenuItemIngredient";
import { MenuItemPackaging } from "./MenuItemPackaging";

export type MenuItem = {
  id: string;
  menuItemId: string;
  ingredients: MenuItemIngredient[];
  packaging: MenuItemPackaging[];
};
