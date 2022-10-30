import type { DomainEntity } from "../../cqrs-es-types/DomainEntity";
import type { UnitOfMeasure } from "./UnitOfMeasure";

export type MenuItemComponent = DomainEntity & {
  menuItemUniqueId: string;
  supplyUniqueId: string;
  /**
   * The unit-of-measure that kitchen staff use to think about the ingredient.
   * @example The unit is ml here, "The salad takes 15 ml of olive oil."
   * @remarks TODO [ubiqitous-language] It might make more sense to call this 'recipeUnits'.
   */
  menuItemSupplyUnits: UnitOfMeasure;
  /**
   * The quantity that kitchen staff use for the ingredient.
   * @example The quantity is 15 here, "The salad takes 15 ml of olive oil."
   * @remarks TODO [ubiqitous-language] It might make more sense to call this 'recipeQuantity'.
   */
  menuItemSupplyQuantity: number;
};
