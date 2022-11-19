const supplyName = "Supply 01";

describe("menu item behavior", () => {
  before(() => {
    cy.addSupply(supplyName);

    cy.visit("/#/menu-items");
    cy.get('[value="New Menu Item"]').click();
    cy.get('[value="Edit"]').click();

    // Add an ingredient quantity so the menu item has a total cost.
    cy.contains("fieldset", "Add Ingredient").within(() => {
      cy.get("select").select(supplyName);
    });

    cy.get(`[row-index=0] [col-id=menuItemSupplyQuantity]`)
      .type("10")
      .type("{enter}");
  });

  describe(`editing 'Servings per Recipe'`, () => {
    before(() => {
      cy.contains("fieldset", "Servings per Recipe").within(() => {
        cy.get("input").clear().type("10").type("{enter}");
      });
    });

    it(`updates the menu item details`, () => {
      cy.contains("fieldset", "Total Cost").within(() => {
        cy.get("p").should("have.text", "$100,000.00");
      });

      cy.contains("fieldset", "Cost per Serving").within(() => {
        cy.get("p").should("have.text", "$10,000.00");
      });
    });

    it(`updates the menu item list`, () => {
      // TODO
    });
  });
});
