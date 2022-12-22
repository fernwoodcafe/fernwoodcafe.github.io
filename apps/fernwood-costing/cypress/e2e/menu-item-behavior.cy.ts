
// TODO Test that the url path updates when we edit the menu item name from the details view.

import type { PartialDeep } from 'type-fest';
import { MenuItem } from '../../src/packages/domain/types';

const supplies = [
  {
    supplyName: "Supply01",
    supplyUnits: "kilogram",
    purchaseQuantity: 5,
    purchasePriceBeforeTax: 25,
    // $5/kilogram
  },
  {
    supplyName: "Supply02",
    supplyUnits: "kilogram",
    purchaseQuantity: 5,
    purchasePriceBeforeTax: 25,
    // $5/kilogram
  },
] as const;

const menuItem: PartialDeep<MenuItem> = {
  menuItemName: "Menu Item",
  menuItemServingsPerRecipe: 2,
  menuItemComponents: supplies.map(supply => ({
    // $50 worth of each supply.
    menuItemSupplyQuantity: 10,
    menuItemSupplyUnits: supply.supplyUnits,
  })),
  // $100/recipe for two supplies.
  // $50/serving for 2 servings per recipe.
} as const;

// For now we calculate these expectations manually to keep things simple.
// To do that, take the supply cost times the supply quantity et cetera.
const expectedTotalCost = "$100.00";
const expectedCostPerServing = "$50.00";

describe("menu item behavior", () => {
  before(() => {
    // Add some supplies to the system.
    supplies.forEach(supply => cy.addSupply(supply));

    // Add the menu item to the system.
    cy.addMenuItem(menuItem);

    // Navigate to the menu item.
    cy.get('[value="Edit"]').click();

    // Add an ingredient quantity so the menu item has a total cost.
    cy.contains("fieldset", "Add Ingredient").within(() => {
      supplies.forEach(supply => {
        cy.get("select").select(supply.supplyName);
       });
    });

    menuItem.menuItemComponents?.forEach((component, index) => {
      cy.inGridEditText(
        index,
        "menuItemSupplyQuantity",
        `${component.menuItemSupplyQuantity}`
      );

      cy.inGridSelectOption(
        index,
        "menuItemSupplyUnits",
        `${component.menuItemSupplyUnits}`
      );
    });
  });

  describe(`editing 'Servings per Recipe'`, () => {
    before(() => {
      cy.contains("fieldset", "Servings per Recipe").within(() => {
        cy.get("input")
          .clear()
          .type(`${menuItem.menuItemServingsPerRecipe}`)
          .type("{enter}");
      });
    });

    it(`updates the menu item details`, () => {
      cy.contains("fieldset", "Total Cost").within(() => {
        cy.get("p").should("contain.text", expectedTotalCost);
      });

      cy.contains("fieldset", "Cost per Serving").within(() => {
        cy.get("p").should("contain.text", expectedCostPerServing);
      });
    });

    it(`updates the menu item list`, () => {
      // TODO
    });
  });
});

export { };

