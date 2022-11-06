const suppliesToCreate = 5;

describe("supplies behavior - creates supplies", () => {
  before(() => {
    // Act
    cy.visit("/#/supplies");

    for (let i = 0; i < suppliesToCreate; ++i) {
      cy.get('[value="New Supply"]').click();
    }
  });

  it("has button 'New Supply'", () => {
    cy.get("input[value='Delete'").should("have.length", suppliesToCreate);
  });
});
