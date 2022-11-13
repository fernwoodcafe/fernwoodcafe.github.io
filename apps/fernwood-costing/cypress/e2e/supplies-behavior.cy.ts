const suppliesToCreate = 3;

const toInnerText = (cells: JQuery<HTMLElement>) =>
  cells.toArray().map((c) => c.innerText);

/**
 * @remarks
 *
 * Some Cypress tests fail when the browser window does not have focus.
 * This is a known issue - do not fix with code. Instead in Chromium browsers
 * use this workaround: Ctrl + Shift + P + "Emulate a focused page"
 * See https://github.com/cypress-io/cypress/issues/5023
 * See also https://github.com/cypress-io/cypress/issues/21673
 */
describe("supplies behavior - creates supplies", () => {
  before(() => {
    // Act
    cy.visit("/#/supplies");

    // Act: Create and edit (n) supplies.
    for (let i = 0; i < suppliesToCreate; ++i) {
      // Create the supply.
      cy.get('[value="New Supply"]').click();

      // Edit each the supply.
      cy.get(`[row-index=${i}]`).within(() => {
        cy.get(`[col-id=supplyName].ag-cell`)
          .type(`${i}_supply`)
          .type("{enter}");

        cy.get(`[col-id=supplierName].ag-cell`)
          .type(`${i}_supplier`)
          .type("{enter}");

        cy.get(`[col-id=purchaseQuantity].ag-cell`)
          .type(`${i + 1}`)
          .type("{enter}");

        cy.get(`[col-id=purchasePriceBeforeTax].ag-cell`)
          .type(`${i + 1}`)
          .type("{enter}");

        cy.get(`[col-id=percentWaste].ag-cell`)
          .type(`${i + 1}`)
          .type("{enter}");
      });
    }

    // TODO Edit the Supply Name column. Done.
    // TODO Edit the Supplier Name column. Done.
    // TODO Edit the Supply Type column.
    // TODO Edit the Supply Units column.
    // TODO Edit the Purchase Quantity column. Done.
    // TODO Edit the Purchase Price before Tax column. Done.
    // TODO Edit the Percent Waste column.
    // TODO Edit the Has PST column.
    // TODO Edit the Supply Notes column.
    // TODO Edit the Supply Link column.
    // TODO Edit the Unit Cost column.
  });

  it(`has 'Delete' ${suppliesToCreate} times`, () => {
    cy.get("input[value='Delete'").should("have.length", suppliesToCreate);
  });

  // TODO Test edit of the Supply Name column. Done.
  // TODO Test edit of the Supplier Name column.
  // TODO Test edit of the Supply Type column.
  // TODO Test edit of the Supply Units column.
  // TODO Test edit of the Purchase Quantity column.
  // TODO Test edit of the Purchase Price before Tax column.
  // TODO Test edit of the Percent Waste column.
  // TODO Test edit of the Has PST column.
  // TODO Test edit of the Supply Notes column.
  // TODO Test edit of the Supply Link column.
  // TODO Test edit of the Unit Cost column.
  it("edited the Supply Name", () => {
    for (let i = 0; i < suppliesToCreate; ++i) {
      cy.contains(`${i}_supply`);
    }
  });

  // Test that the table sorts properly.
  // See https://www.cypress.io/blog/2020/07/27/sorting-the-table/
  // See also https://blog.ag-grid.com/testing-with-ag-grid-vue-js-cypress/
  // Important: this only works if ag-grid sorts in the DOM not with CSS.

  const columnsToSort = [
    // TODO Test sort of the Supply Name column. Done.
    // TODO Test sort on the Supplier Name column. Done.
    // TODO Test sort on the Supply Type column.
    // TODO Test sort on the Supply Units column.
    // TODO Test sort on the Purchase Quantity column. Done.
    // TODO Test sort on the Purchase Price before Tax column. Done.
    // TODO Test sort on the Percent Waste column. Done.
    // TODO Test sort on the Has PST column.
    // TODO Test sort on the Supply Notes column.
    // TODO Test sort on the Supply Link column.
    // TODO Test sort on the Unit Cost column.
    ["Supply Name", "supplyName"],
    ["Supplier Name", "supplierName"],
    ["Purchase Quantity", "purchaseQuantity"],
    ["Purchase Price before Tax", "purchasePriceBeforeTax"],
    ["Percent Waste", "percentWaste"],
  ].map(([columnHeaderText, columnId]) => ({
    columnHeaderText,
    columnId,
  }));

  columnsToSort.forEach(({ columnHeaderText, columnId }) => {
    it(`sorts by ${columnHeaderText}`, () => {
      cy.get(".ag-theme-alpine").within(() => {
        cy.contains(".ag-header-cell-label", columnHeaderText)
          // The first click does not change the order,
          // because we added the supplies in lexical order.
          .click()
          // The second click sorts it to reversed lexical order.
          .click()
          .then(() => {
            // Make sure that the down pointing sort icon appears.
            cy.contains(".ag-header-cell-label", columnHeaderText)
              .find("[ref=eSortDesc]")
              .should("be.visible");

            cy.get(`[col-id=${columnId}].ag-cell`)
              .then(toInnerText)
              .then((cellsInnerText) => {
                const reversed = cellsInnerText.slice().sort().reverse();
                expect(cellsInnerText, "cells are reversed").to.deep.equal(
                  reversed
                );
              });
          });
      });
    });
  });
});
