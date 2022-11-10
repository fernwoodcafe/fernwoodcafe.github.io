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
      cy.focused().type(`${i}_supply`).blur();
    }
  });

  it(`has 'Delete' ${suppliesToCreate} times`, () => {
    cy.get("input[value='Delete'").should("have.length", suppliesToCreate);
  });

  it("renamed each of the supplies", () => {
    for (let i = 0; i < suppliesToCreate; ++i) {
      cy.contains(`${i}_supply`);
    }
  });
});
