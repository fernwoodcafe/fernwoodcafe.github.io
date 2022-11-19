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
    }
  }
}



Cypress.Commands.add("addSupply", (supplyName) => {
  cy.visit("/#/supplies");
  cy.get('[value="New Supply"]').click();
  cy.get(`[col-id="supplyName"].ag-cell`).type(supplyName).type("{enter}");
  cy.get(`[col-id=supplyUnits].ag-cell`)
    .click()
    // Do not use `within`, because the drop down list renders outside the cell.
    .then(() => {
      cy.focused().click();
      cy.get(".ag-popup").contains("gram").click();
    });
  cy.get(`[col-id="purchaseQuantity"].ag-cell`).type("10").type("{enter}");
  cy.get(`[col-id="purchasePriceBeforeTax"].ag-cell`)
    .type("100")
    .type("{enter}");
});

export {};
