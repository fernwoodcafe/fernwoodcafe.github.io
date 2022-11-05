const inventorySheetsToCreate = 5;

describe("inventory behavior - creates inventory sheets", () => {
  before(() => {
    // Act
    cy.visit("/#/inventory");

    for (let i = 0; i < inventorySheetsToCreate; ++i) {
      cy.get('[value="New Inventory Sheet"]').click();
    }
  });

  after(() => {
    // TODO [maybe] Clear the indexDB directly instead of cleaning up through the DOM.
    for (let i = 0; i < inventorySheetsToCreate; ++i) {
      cy.get("input[value='Delete'").first().click();
    }
  });

  it("has button 'New Inventory Sheet'", () => {
    cy.get("input[value='Delete'").should(
      "have.length",
      inventorySheetsToCreate
    );
  });
});
