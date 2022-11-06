describe("inventory", () => {
  it("passes", () => {
    cy.visit("/#/menu-items");
    cy.get("input[value='New Menu Item']").first().click();
    cy.get("input[value='Edit']").first().click();
  });
});
