import { roundToTwoDecimalPlaces, type RecipePermutation } from '.';

type PackagingOption =
  | "cup - 8 oz"
  | "cup - 12 oz"
  | "cup - 16 oz"
  | "lid - 8 oz"
  | "lid - 10 to 20 oz"
  | "sleeve - 12 to 20 oz";

const packagingCost = new Map<PackagingOption, number>([
  ["cup - 8 oz", 0.13],
  ["cup - 12 oz", 0.17],
  ["cup - 16 oz", 0.19],
  ["lid - 8 oz", 0.12],
  ["lid - 10 to 20 oz", 0.13],
  ["sleeve - 12 to 20 oz", 0.08],
]);

const packagingForSizeInOunces = new Map<number, PackagingOption[]>([
  [8, ["cup - 8 oz", "lid - 8 oz"]],
  [12, ["cup - 12 oz", "lid - 10 to 20 oz", "sleeve - 12 to 20 oz"]],
  [16, ["cup - 16 oz", "lid - 10 to 20 oz", "sleeve - 12 to 20 oz"]],
]);

const lookupPackagingCost = (recipe: Pick<RecipePermutation, 'cupKind' | 'drinkSizeOunces'>) => {

  if (recipe.cupKind !== "to_go") return 0;

  // cup + lid + sleeve
  switch (recipe.drinkSizeOunces) {
    // Note: We currently do not have 8 ounce sleeves; people tend not to ask for them.
    case 8: return roundToTwoDecimalPlaces(0.13 + 0.12 + 0.0);
    case 12: return roundToTwoDecimalPlaces(0.17 + 0.13 + 0.08);
    case 16: return roundToTwoDecimalPlaces(0.19 + 0.13 + 0.08);
  }
}

// TODO Put the cup/lid/sleeve costs in an external data source.
export default (recipe: Pick<RecipePermutation, 'cupKind' | 'drinkSizeOunces'>) => ({
    packaging: [ 'cup', 'lid', 'sleeve' ],
    packagingCostDollars: lookupPackagingCost(recipe)
});

