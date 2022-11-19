describe("menu item behavior", () => {
  before(() => {
    cy.addSupply("Supply 01");

    cy.visit("/#/menu-items");
    cy.get('[value="New Menu Item"]').click();
    cy.get('[value="Edit"]').click();
  });

  const inputLabel = "Chosen Price";

  describe(`editing ${inputLabel}`, () => {
    before(() => {
      cy.contains("fieldset", inputLabel).within(() => {
        cy.get("input").clear().type("1").type("{enter}");
      });
    });

    it("updates the menu item details", () => {
      // TODO
    });

    it("updates the menu item list", () => {
      // TODO
    });
  });
});
