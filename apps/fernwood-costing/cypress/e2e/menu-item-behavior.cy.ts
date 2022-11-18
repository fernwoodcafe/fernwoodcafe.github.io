describe("TODO add useful description", () => {
  before(() => {
    // Act
    cy.visit("/#/menu-items");

    // Act: Create and edit one menu item.
    cy.get('[value="New Menu Item"]').click();

    cy.get(`[col-id=menuItemName]`).type("foo").type("{enter}");

    cy.get('[value="Edit"]').click();

    cy.contains("a", "Menu Items").click();
  });

  it("does something", () => {
    // TODO
  });
});
