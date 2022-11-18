const expectedButtons = ["New Inventory Sheet"];

const expectedTableHeaders = ["Date Started", "Date Completed"];

describe("inventory layout", () => {
  before(() => {
    cy.visit("/#/inventory");
  });

  expectedButtons.forEach((buttonText) => {
    it(`has button '${buttonText}'`, () => {
      // Assert
      cy.get('[type="button"]').should("have.value", buttonText);
    });
  });

  expectedTableHeaders.forEach((headerText) => {
    it(`has table header '${headerText}'`, () => {
      // Assert
      cy.contains(".ag-header-cell-text", headerText);
    });
  });
});

export {};
