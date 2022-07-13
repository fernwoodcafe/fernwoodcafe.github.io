type CafeSupply = {
  id: string;
  supplyId: string;
  unitSize: string;
  unitCost: number;
};

type CafeMenuItemIngredient = {
  id: string;
  supplyId: string;
};

type CafeMenuItemPackaging = {
  id: string;
  supplyId: string;
  unitQuantity: number;
};

type CafeMenuItem = {
  id: string;
  menuItemId: string;
  ingredients: CafeMenuItemIngredient[];
  packaging: CafeMenuItemPackaging[];
};
