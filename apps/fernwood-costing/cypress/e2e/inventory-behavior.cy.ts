const inventorySheetsToCreate = 5;

describe("inventory behavior - creates inventory sheets", () => {
  before(() => {
    cy.visit("/#/inventory");

    for (let i = 0; i < inventorySheetsToCreate; ++i) {
      cy.get('[value="New Inventory Sheet"]').click();
    }
  });

  it("has button 'New Inventory Sheet'", () => {
    cy.get("input[value='Delete'").should(
      "have.length",
      inventorySheetsToCreate
    );
  });
});