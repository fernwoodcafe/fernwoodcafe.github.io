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
      addSupply(label: string): Chainable<void>;
      addMenuItem(label: string): Chainable<void>;
      inGridEditText(
        rowIndex: number,
        columnId: string,
        text: string
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
    .type(text)
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

Cypress.Commands.add("addMenuItem", (menuItemName) => {
  cy.visit("/#/menu-items");
  cy.get('[value="New Menu Item"]').click();
  cy.focused().type(menuItemName).type("{enter}");
});

Cypress.Commands.add("addSupply", (supplyName) => {
  cy.visit("/#/supplies");
  cy.get('[value="New Supply"]').click();
  cy.focused().type(supplyName).type("{enter}");

  cy.contains(".ag-row", supplyName).then((row) => {
    const index = row.attr("row-index");

    if (index === undefined) {
      throw new Error("Undefined row-index in command");
    }

    cy.inGridSelectOption(parseInt(index), "supplyUnits", "gram");

    cy.get(`[col-id="purchaseQuantity"].ag-cell`).type("10").type("{enter}");
    cy.get(`[col-id="purchasePriceBeforeTax"].ag-cell`)
      .type("100")
      .type("{enter}");
  });
});

export {};
