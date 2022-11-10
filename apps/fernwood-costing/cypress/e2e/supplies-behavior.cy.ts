const suppliesToCreate = 5;

describe("supplies behavior - creates supplies", () => {
  before(() => {
    // Act
    cy.visit("/#/supplies");

    // Create (n) supplies.
    for (let i = 0; i < suppliesToCreate; ++i) {
      cy.get('[value="New Supply"]').click();
    }

    // Edit each of the (n) supplies
    for (let i = 0; i < suppliesToCreate; ++i) {
      cy.contains(`New Supply ${i}`).click();
      cy.focused().type(`Supply${i}`);
    }
  });

  it("has button 'New Supply'", () => {
    cy.get("input[value='Delete'").should("have.length", suppliesToCreate);
  });
});
