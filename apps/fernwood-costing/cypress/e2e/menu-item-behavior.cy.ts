import type { MenuItemComponent } from "../../src/packages/domain/types";

const supply = {
  supplyName: "Supply",
  supplyUnits: "kilogram",
  purchaseQuantity: 5,
  purchasePriceBeforeTax: 25,
  // $5/kilogram
} as const;

const menuItem = {
  menuItemName: "Menu Item",
  menuItemServingsPerRecipe: 2,
  menuItemComponents: [
    {
      menuItemSupplyQuantity: 10,
      menuItemSupplyUnits: supply.supplyUnits,
      // $50 worth of the supply.
    } as MenuItemComponent,
  ],
  // $50/recipe.
  // $25/serving.
} as const;

// For now we calculate these expectations manually to keep things simple.
// To do that, take the supply cost times the supply quantity et cetera.
const expectedTotalCost = "$50.00";
const expectedCostPerServing = "$25.00";

describe("menu item behavior", () => {
  before(() => {
    cy.addSupply(supply);
    cy.addMenuItem(menuItem);

    // Navigate to the menu item details.
    cy.get('[value="Edit"]').click();

    // Add an ingredient quantity so the menu item has a total cost.
    cy.contains("fieldset", "Add Ingredient").within(() => {
      cy.get("select").select(supply.supplyName);
    });

    const rowIndex = 0;

    menuItem.menuItemComponents.forEach((component) => {
      cy.inGridEditText(
        rowIndex,
        "menuItemSupplyQuantity",
        `${component.menuItemSupplyQuantity}`
      );

      cy.inGridSelectOption(
        rowIndex,
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

export {};
