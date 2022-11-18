const supplyBaseName = "Supply";
const menuItemBaseName = "Menu Item";

describe("complete menu item costing", () => {
  before(() => {
    // Add supplies
    cy.visit("/#/supplies");
    cy.get('[value="New Supply"]').click();
    cy.get(`[col-id="supplyName"].ag-cell`)
      .type(supplyBaseName)
      .type("{enter}");
    cy.get(`[col-id=supplyUnits].ag-cell`)
      .click()
      // Do not use `within`, because the drop down list renders outside the cell.
      .then(() => {
        cy.focused().click();
        cy.get(".ag-popup").contains("gram").click();
      });
    cy.get(`[col-id="purchaseQuantity"].ag-cell`).type("10").type("{enter}");
    cy.get(`[col-id="purchasePriceBeforeTax"].ag-cell`)
      .type("100")
      .type("{enter}");

    // Now do the creation of the menu item.
    cy.visit("/#/menu-items");

    // Now we follow a pattern of navigating back and forth between the
    // list view and the details view while making and confirming edits.

    // Ping: List view.
    cy.get('[value="New Menu Item"]').click();
    cy.get(`[col-id="menuItemName"].ag-cell`)
      .type(`${menuItemBaseName}_01`)
      .type("{enter}");

    // Pong: Details view.
    cy.get('[value="Edit"]').click();
    cy.get("h2 fieldset > input")
      .should("have.value", `${menuItemBaseName}_01`)
      .clear()
      .type(`${menuItemBaseName}_02`);

    // TODO Add an ingredient to the menu item.
    // TODO Add a supply to the menu item.

    // Ping: List view.
    cy.contains("a", "Menu Items").click();
    cy.get(`[col-id="menuItemName"].ag-cell`).should(
      "have.text",
      `${menuItemBaseName}_02`
    );

    // Pong: Details view.
    cy.get('[value="Edit"]').click();
    cy.get("h2 fieldset > input")
      .should("have.value", `${menuItemBaseName}_02`)
      .clear()
      .type(`${menuItemBaseName}_03`);

    // Ping: List view.
    cy.contains("a", "Menu Items").click();
    cy.get(`[col-id="menuItemName"].ag-cell`).should(
      "have.text",
      `${menuItemBaseName}_03`
    );
  });

  it("does something", () => {
    // TODO
  });
});
