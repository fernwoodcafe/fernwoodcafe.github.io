import { roundToTwoDecimalPlaces, type RecipePermutation } from '.';

export default (recipe: Pick<RecipePermutation, 'cupKind' | 'drinkSizeOunces'>) => {
  if (recipe.cupKind !== "to_go") {
    return {
      packagingCostDollars: 0,
    };
  }

  // cup + lid + sleeve
  switch (recipe.drinkSizeOunces) {
    case 8:
      // Note: We currently do not have 8 ounce sleeves;
      // people tend not to ask for them.
      return {
        packagingCostDollars: roundToTwoDecimalPlaces(0.13 + 0.12 + 0.0),
      };
    case 12:
      return {
        packagingCostDollars: roundToTwoDecimalPlaces(0.17 + 0.13 + 0.08),
      };
    case 16:
      return {
        packagingCostDollars: roundToTwoDecimalPlaces(0.19 + 0.13 + 0.08),
      };
  }
};

