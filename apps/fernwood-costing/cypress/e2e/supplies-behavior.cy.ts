const suppliesToCreate = 3;

const tableTestCase = (
  columnHeader: string,
  columnId: string,
  dummyValueForRowIndex: (i: number) => string
) => ({
  columnHeader,
  columnId,
  dummyValueForRowIndex,
});

const testCases = [
  // TODO Test sort of the Supply Name column. Done.
  // TODO Test sort on the Supplier Name column. Done.
  // TODO Test sort on the Supply Type column.
  // TODO Test sort on the Supply Units column.
  // TODO Test sort on the Purchase Quantity column. Done.
  // TODO Test sort on the Purchase Price before Tax column. Done.
  // TODO Test sort on the Percent Waste column. Done.
  // TODO Test sort on the Has PST column.
  // TODO Test sort on the Unit Cost column.
  tableTestCase("Supply Name", "supplyName", (i) => `${i}_supplyName`),
  tableTestCase("Supplier Name", "supplierName", (i) => `${i}_supplierName`),
  tableTestCase("Purchase Quantity", "purchaseQuantity", (i) => `${i}`),
  tableTestCase(
    "Purchase Price before Tax",
    "purchasePriceBeforeTax",
    (i) => `${i}`
  ),
  tableTestCase("Percent Waste", "percentWaste", (i: number) => `${i}`),
];

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

      // Edit each column of the supply.
      cy.get(`[row-index=${i}]`).within(() => {
        testCases.forEach(({ columnId, dummyValueForRowIndex }) => {
          cy.get(`[col-id=${columnId}].ag-cell`)
            .type(dummyValueForRowIndex(i))
            .type("{enter}");
        });
      });
    }

    // TODO Edit the Supply Name column. Done.
    // TODO Edit the Supplier Name column. Done.
    // TODO Edit the Supply Type column.*
    // TODO Edit the Supply Units column.
    // TODO Edit the Purchase Quantity column. Done.
    // TODO Edit the Purchase Price before Tax column. Done.
    // TODO Edit the Percent Waste column. Done.
    // TODO Edit the Has PST column.
    // TODO Edit the Unit Cost column. Not done. We compute this column.
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
  // TODO Test computation of the Unit Cost column.
  testCases.forEach(({ columnHeader, dummyValueForRowIndex }) => {
    it(`edited column '${columnHeader}'`, () => {
      for (let i = 0; i < suppliesToCreate; ++i) {
        cy.contains(dummyValueForRowIndex(i));
      }
    });
  });

  // Test that the table sorts properly.
  // See https://www.cypress.io/blog/2020/07/27/sorting-the-table/
  // See also https://blog.ag-grid.com/testing-with-ag-grid-vue-js-cypress/
  // Important: this only works if ag-grid sorts in the DOM not with CSS.
  testCases.forEach(({ columnHeader, columnId }) => {
    it(`sorts by ${columnHeader}`, () => {
      cy.get(".ag-theme-alpine").within(() => {
        cy.contains(".ag-header-cell-label", columnHeader)
          // The first click does not change the order,
          // because we added the supplies in lexical order.
          .click()
          // The second click sorts it to reversed lexical order.
          .click()
          .then(() => {
            // Make sure that the down pointing sort icon appears.
            cy.contains(".ag-header-cell-label", columnHeader)
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
