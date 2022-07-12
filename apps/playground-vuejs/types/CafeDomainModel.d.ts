type CafeSupply = {
  id: string;
  supplyId: string;
};

type CafeRecipe = {
  id: string;
  recipeId: string;
  supplies: CafeSupply[];
};
