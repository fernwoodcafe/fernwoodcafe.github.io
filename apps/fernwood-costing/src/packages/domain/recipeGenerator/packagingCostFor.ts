import { roundToTwoDecimalPlaces, type RecipePermutation } from '.';

type PackagingOption =
  | "cup @ 8 oz"
  | "cup @ 12 oz"
  | "cup @ 16 oz"
  | "lid @ 8 oz"
  | "lid @ 10 to 20 oz"
  | "sleeve @ 12 to 20 oz";

const costForPackaging = new Map<PackagingOption, number>([
  ["cup @ 8 oz", 0.13],
  ["cup @ 12 oz", 0.17],
  ["cup @ 16 oz", 0.19],
  ["lid @ 8 oz", 0.12],
  ["lid @ 10 to 20 oz", 0.13],
  ["sleeve @ 12 to 20 oz", 0.08],
]);

const packagingForHotDrinkSizeInOunces = new Map<number, PackagingOption[]>([
  [8, ["cup @ 8 oz", "lid @ 8 oz"]],
  [12, ["cup @ 12 oz", "lid @ 10 to 20 oz", "sleeve @ 12 to 20 oz"]],
  [16, ["cup @ 16 oz", "lid @ 10 to 20 oz", "sleeve @ 12 to 20 oz"]],
]);

// TODO Put the cup/lid/sleeve costs in an external data source.
export default (recipe: Pick<RecipePermutation, 'cupKind' | 'drinkSizeOunces'>) => {
  const packaging = packagingForHotDrinkSizeInOunces.get(recipe.drinkSizeOunces);
  return {
    packaging,
    packagingCostDollars: roundToTwoDecimalPlaces(packaging.reduce((acc, next) => acc + costForPackaging.get(next), 0))
  };
};
