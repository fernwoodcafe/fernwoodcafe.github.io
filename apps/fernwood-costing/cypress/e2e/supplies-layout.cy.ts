const expectedButtons = ["New Supply"];

const expectedTableHeaders = [
  "Supply Name",
  "Supplier Name",
  "Supply Type",
  "Supply Units",
  "Purchase Quantity",
  "Purchase Price before Tax",
  "Percent Waste",
  "Has PST",
  "Supply Link",
  "Unit Cost",
  "Actions",
];

describe("supplies layout", () => {
  before(() => {
    cy.visit("/#/supplies");
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
