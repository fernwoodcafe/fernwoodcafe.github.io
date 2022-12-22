import type { PartialDeep } from 'type-fest';
import type { MenuItem, Supply } from "../../src/packages/domain/types";

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      addSupply(supply: PartialDeep<Supply>): Chainable<void>;
      addMenuItem(menuItem: PartialDeep<MenuItem>): Chainable<void>;
      inGridEditText(
        rowIndex: number,
        columnId: string,
        text: string | number
      ): Chainable<void>;
      inGridSelectOption(
        rowIndex: number,
        columnId: string,
        option: string
      ): Chainable<void>;
      inGridToggleCheckbox(rowIndex: number, columnId: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("inGridEditText", (rowIndex, columnId, text) => {
  cy.get(`[row-index=${rowIndex}] [col-id=${columnId}]`)
    .type(text.toString())
    .type("{enter}");
});

Cypress.Commands.add("inGridToggleCheckbox", (rowIndex, columnId) => {
  cy.get(`[row-index=${rowIndex}] [col-id=${columnId}]`)
    .click()
    .within(() => {
      cy.get("input[type=checkbox]").click().type("{enter}");
    });
});

Cypress.Commands.add("inGridSelectOption", (rowIndex, columnId, option) => {
  cy.get(`[row-index=${rowIndex}] [col-id=${columnId}].ag-cell`)
    .click()
    // Do not use `within`, because the drop down list renders outside the cell.
    .then(() => {
      cy.focused().click();
      cy.get(".ag-popup").contains(option).click();
    });
});

Cypress.Commands.add("addMenuItem", (menuItem: PartialDeep<MenuItem>) => {
  cy.visit("/#/menu-items");
  cy.get('[value="New Menu Item"]').click();

  if (!menuItem.menuItemName) {
    throw new Error("menuItemName required");
  }

  cy.focused().type(menuItem.menuItemName).type("{enter}");
});

Cypress.Commands.add("addSupply", (supply: PartialDeep<Supply>) => {
  cy.visit("/#/supplies");
  cy.get('[value="New Supply"]').click();

  if (!supply.supplyName) {
    throw new Error("supplyName required");
  }

  cy.focused().type(supply.supplyName).type("{enter}");
  cy.contains(".ag-row", supply.supplyName).then((row: JQuery<HTMLElement>) => {

    const getAttr = (element: JQuery<HTMLElement>, attributeName: string) => {

      const value = row.attr("row-index");

      if (value === undefined) {
        throw new Error(`Undefined ${attributeName} HTMLElement`);
      }

      return value;
    };

    const rowIndex = parseInt(getAttr(row, "row-index"));

    if (supply.supplyUnits) {
      cy.inGridSelectOption(
        rowIndex,
        "supplyUnits",
        supply.supplyUnits ?? "" ?? "grams"
      );
    }

    if (supply.purchaseQuantity) {
      cy.inGridEditText(
        rowIndex,
        'purchaseQuantity',
        supply.purchaseQuantity
      );
    }

    if (supply.purchasePriceBeforeTax) {
      cy.inGridEditText(
        rowIndex,
        "purchasePriceBeforeTax",
        supply.purchasePriceBeforeTax
      )
    }
  });
});

export { };

