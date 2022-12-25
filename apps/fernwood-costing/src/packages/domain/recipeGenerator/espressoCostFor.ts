import type { RecipePermutation } from '.';

export default (recipe: Pick<RecipePermutation, 'espressoShots'>) => ({
  espressoGrams: 18.5 * (recipe.espressoShots / 2),
  espressoFluidOunces: 1.5 * (recipe.espressoShots / 2),
  espressoCostDollars: 0.57 * (recipe.espressoShots / 2),
});
