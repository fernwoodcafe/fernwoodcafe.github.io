const expectedButtons = ["New Menu Item"];

const expectedTableHeaders = [
  "Actions",
  "Menu Item Name",
  "Total Cost",
  "Servings per Recipe",
  "Cost per Serving",
  "Baseline Price @ 3.5 Markup",
  "Percent Total Sales",
  "Chosen Menu Price",
  "Markup",
  "Contribution (Price - Cost)",
  "Actions",
];

describe("menu-items layout", () => {
  before(() => {
    // Act
    cy.visit("/#/menu-items");
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
