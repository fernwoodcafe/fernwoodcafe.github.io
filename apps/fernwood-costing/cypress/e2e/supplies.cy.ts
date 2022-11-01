describe("supplies", () => {
  before(() => {
    // Act
    cy.visit("/#/supplies");
  });

  it("has button 'New Supply'", () => {
    // Assert
    cy.get('[type="button"]').should("have.value", "New Supply");
  });

  [
    "Supply Name",
    "Supplier Name",
    "Supply Type",
    "Supply Units",
    "Purchase Quantity",
    "Purchase Price before Tax",
    "Percent Waste",
    "Has PST",
    "Supply Notes",
    "Supply Link",
    "Unit Cost",
    "Actions",
  ].forEach((headerText) => {
    it(`has table header '${headerText}'`, () => {
      // Assert
      cy.contains(".ag-header-cell-text", headerText);
    });
  });
});
