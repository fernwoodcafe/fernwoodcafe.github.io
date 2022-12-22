// TODO Test that the url path updates when we edit the menu item name from the details view.

import type { PartialDeep } from "type-fest";
import type { MenuItem } from "../../src/packages/domain/types";
import { compareCurrency, compareNumbers, compareStrings } from "../misc/compareUserInput";
import toInnerText from "../misc/toInnerText";
import { agGridQueries } from "../support/commands";

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
  menuItemComponents: supplies.map((supply, index) => ({
    // $50 worth of each supply.
    menuItemSupplyQuantity: 10 * (index + 1),
    menuItemSupplyUnits: supply.supplyUnits,
  })),
  // $100/recipe for two supplies.
  // $50/serving for 2 servings per recipe.
} as const;

// For now we calculate these expectations manually to keep things simple.
// To do that, take the supply cost times the supply quantity et cetera.
// TODO [should-have, refactor] Calculate these programmatically.
const expectedTotalCost = "$150.00";
const expectedCostPerServing = "$75.00";

describe("menu item behavior", () => {
  before(() => {
    // Add some supplies to the system.
    supplies.forEach((supply) => cy.addSupply(supply));

    // Add the menu item to the system.
    cy.addMenuItem(menuItem);

    // Navigate to the menu item.
    cy.get('[value="Edit"]').click();

    // Add components so the menu item has a total cost.
    cy.contains("fieldset", "Add Ingredient").within(() => {
      supplies.forEach((supply) => {
        cy.get("select").select(supply.supplyName);
      });
    });

    // Set component quantities and units.
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

    [
      {
        columnHeader: "Supply Cost and Units",
        columnId: "supplyDetails",
        compareFn: compareStrings
      },
      {
        columnHeader: "Units",
        columnId: "menuItemSupplyUnits",
        compareFn: compareStrings
      },
      {
        columnHeader: "Quantity",
        columnId: "menuItemSupplyQuantity",
        compareFn: compareNumbers
      },
      {
        columnHeader: "Cost",
        columnId: "menuItemSupplyCost",
        compareFn: compareCurrency
      },
    ].forEach(({ columnHeader, columnId, compareFn }) => {
      it(`sorts by ${columnHeader}`, () => {
        cy.get(".ag-theme-alpine").within(() => {
          agGridQueries
            .getHeader(columnId)
            // The first click does not change the order,
            // because we added the supplies in lexical order.
            .click()
            // The second click sorts it to reversed lexical order.
            .click()
            .then(() => {
              // Make sure that the down pointing sort icon appears.
              agGridQueries
                .getHeader(columnId)
                .find("[ref=eSortDesc]")
                .should("be.visible");

              agGridQueries
                .getColumns(columnId)
                .then(toInnerText)
                .then((cellsInnerText) => {
                  // TODO Share this logic with other sorting tests.
                  const reversed = cellsInnerText
                    .slice()
                    .sort(compareFn)
                    .reverse();

                  expect(cellsInnerText, "cells are reversed").to.deep.equal(
                    reversed
                  );
                });
            });
        });
      });
    });
  });
});
