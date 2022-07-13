type CafeSupply = {
  id: string;
  supplyId: string;
  unitSize: string;
  unitCost: number;
};

type CafeMenuItemIngredient = {};

type CafeMenuItem = {
  id: string;
  menuItemId: string;
  ingredients: CafeMenuItemIngredient[];
};
