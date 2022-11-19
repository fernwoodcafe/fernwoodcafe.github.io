before(() => {
  cy.visit("/#/menu-items");
  cy.get('[value="New Menu Item"]').click();
  cy.get('[value="Edit"]').click();
});
