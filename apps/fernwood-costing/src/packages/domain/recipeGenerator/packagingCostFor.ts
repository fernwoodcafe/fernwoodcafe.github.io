import { roundToTwoDecimalPlaces, type RecipePermutation } from '.';

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

export default (recipe: Pick<RecipePermutation, 'cupKind' | 'drinkSizeOunces'>) => ({
    lidSize: 0,
    cupSize: 0,
    sleeveSize: 0,
    packagingCostDollars: lookupPackagingCost(recipe)
});

