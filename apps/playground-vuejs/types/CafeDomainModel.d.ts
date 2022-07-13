type CafeSupply = {
  id: string;
  supplyId: string;
  unitSize: string;
  unitCost: number;
};

type CafeRecipe = {
  id: string;
  recipeId: string;
  supplies: CafeSupply[];
};
