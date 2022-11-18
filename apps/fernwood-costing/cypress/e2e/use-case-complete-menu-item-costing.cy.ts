describe("complete menu item costing", () => {
  before(() => {
    const supplyBaseName = "Supply";

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

    // Visit the menu items list and create a default item.
    cy.visit("/#/menu-items");
    cy.get('[value="New Menu Item"]').click();
  });

  // Now we follow a pattern of navigating back and forth between the
  // list view and the details view while making and confirming edits.

  // TODO Add an ingredient to the menu item.
  // TODO Add a supply to the menu item.
  // TODO Play ping-pong with Percent Total Sales.
  // TODO Play ping-pong with Chosen Menu Price.
  // TODO ...
  // TODO ...
  // TODO ...
  // TODO ...

  it.skip("ping pongs 'menuItemName' between list and details views", () => {
    // Arrange
    const baseValue = "Menu Item";
    const columnId = "menuItemName";

    // Ping 01: List view.
    cy.visit("/#/menu-items");
    cy.get(`[col-id="${columnId}"].ag-cell`)
      .type(`${baseValue}_01`) // act
      .type("{enter}");

    // Pong 02: Details view.
    cy.get('[value="Edit"]').click();
    cy.get("h2 fieldset > input")
      .should("have.value", `${baseValue}_01`) // assert
      .clear()
      .type(`${baseValue}_02`); // act

    // Ping 03: List view.
    cy.contains("a", "Menu Items").click();
    cy.get(`[col-id="${columnId}"].ag-cell`)
      .should(
        "have.text",
        `${baseValue}_02` // assert
      )
      .click()
      .type(`${baseValue}_03`); // act

    // Pong 04: Details view.
    cy.get('[value="Edit"]').click();
    cy.get("h2 fieldset > input")
      .should("have.value", `${baseValue}_03`)
      .clear()
      .type(`${baseValue}_04`);

    // Ping: List view.
    cy.contains("a", "Menu Items").click();
    cy.get(`[col-id="${columnId}"].ag-cell`).should(
      "have.text",
      `${baseValue}_04` // assert
    );
  });

  it("ping pongs 'percentTotalSales' between list and details views", () => {
    // Arrange
    const baseValue = 1;
    const columnId = "percentTotalSales";

    // Now do the creation of the menu item.
    cy.visit("/#/menu-items");

    // Ping 01: List view.
    cy.get(`[col-id="${columnId}"].ag-cell`)
      .click()
      .type(`${baseValue + 1}`) // act
      .type("{enter}");

    // Pong 02: Details view.
    cy.get('[value="Edit"]').click();
    cy.contains("fieldset", "Projected Percent Total Sales").within(() => {
      cy.get("input")
        .should("have.value", `${baseValue + 1}`) // assert
        .clear()
        .type(`${baseValue + 2}`); // act
    });

    // Ping 03: List view.
    cy.contains("a", "Menu Items").click();
    cy.get(`[col-id="${columnId}"].ag-cell`)
      .should(
        "contain.text",
        `${baseValue + 2}` // assert
      )
      .click()
      .type(`${baseValue + 3}`) // act
      .type(`{enter}`);

    // Pong 04: Details view.
    cy.get('[value="Edit"]').click();
    cy.contains("fieldset", "Projected Percent Total Sales").within(() => {
      cy.get("input")
        .should("have.value", `${baseValue + 3}`)
        .clear()
        .type(`${baseValue + 4}`);
    });

    // Ping: List view.
    cy.contains("a", "Menu Items").click();
    cy.get(`[col-id="${columnId}"].ag-cell`).should(
      "contain.text",
      `${baseValue + 4}` // assert
    );
  });
});
