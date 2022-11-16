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

const simpleTestCases = [
  tableTestCase("Supply Name", "supplyName", (i) => `${i}_supplyName`),
  tableTestCase("Supplier Name", "supplierName", (i) => `${i}_supplierName`),
  tableTestCase("Purchase Quantity", "purchaseQuantity", (i) => `${i + 1}`),
  tableTestCase(
    "Purchase Price before Tax",
    "purchasePriceBeforeTax",
    (i) => `${i + 1}`
  ),
  tableTestCase("Percent Waste", "percentWaste", (i) => `${i + 1}`),
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

      // Edit each simple column of the supply.
      simpleTestCases.forEach(({ columnId, dummyValueForRowIndex }) => {
        cy.get(`[row-index=${i}] [col-id=${columnId}].ag-cell`)
          .type(dummyValueForRowIndex(i))
          .type("{enter}");
      });

      // Edit Drop Down Lists
      cy.get(`[row-index=${i}] [col-id=supplyType].ag-cell`)
        .click()
        // Do not use `within`, because the drop down list renders outside the cell.
        .then(() => {
          cy.focused().click();
          cy.get(".ag-popup").contains("packaging").click();
        });

      cy.get(`[row-index=${i}] [col-id=supplyUnits].ag-cell`)
        .click()
        // Do not use `within`, because the drop down list renders outside the cell.
        .then(() => {
          cy.focused().click();
          cy.get(".ag-popup").contains("gram").click();
        });

      // Edit Checkboxes
      cy.get(`[row-index=${i}] [col-id=hasPST].ag-cell`)
        .click()
        .within(() => {
          cy.get("input[type=checkbox]").click().type("{enter}");
        });
    }

    // TODO Edit the Supply Name column. Done.
    // TODO Edit the Supplier Name column. Done.
    // TODO Edit the Supply Type column. Done.
    // TODO Edit the Supply Units column. Done.
    // TODO Edit the Purchase Quantity column. Done.
    // TODO Edit the Purchase Price before Tax column. Done.
    // TODO Edit the Percent Waste column. Done.
    // TODO Edit the Has PST column. Done.
    // TODO Edit the Unit Cost column. Not done. We compute this column.
  });

  it(`has 'Delete' ${suppliesToCreate} times`, () => {
    cy.get("input[value='Delete'").should("have.length", suppliesToCreate);
  });

  // TODO Test edit of the Supply Name column. Done.
  // TODO Test edit of the Supplier Name column. Done.
  // TODO Test edit of the Supply Type column. Done.
  // TODO Test edit of the Supply Units column. Done.
  // TODO Test edit of the Purchase Quantity column. Done.
  // TODO Test edit of the Purchase Price before Tax column. Done.
  // TODO Test edit of the Percent Waste column. Done.
  // TODO Test edit of the Has PST column. Done.
  // TODO Test computation of the Unit Cost column. Done.
  for (let rowIndex = 0; rowIndex < suppliesToCreate; ++rowIndex) {
    simpleTestCases.forEach(({ columnHeader, dummyValueForRowIndex }) => {
      it(`edited simple column '${columnHeader}'`, () => {
        cy.contains(dummyValueForRowIndex(rowIndex));
      });
    });

    it(`edited column 'Supply Type'`, () => {
      const columnId = "supplyType";
      cy.get(`[row-index=${rowIndex}] [col-id=${columnId}].ag-cell`).contains(
        "packaging"
      );
    });

    it(`edited column 'Supply Units'`, () => {
      const columnId = "supplyUnits";
      cy.get(`[row-index=${rowIndex}] [col-id=${columnId}].ag-cell`).contains(
        "gram"
      );
    });

    it(`edited column 'Has PST'`, () => {
      const columnId = "hasPST";
      cy.get(`[row-index=${rowIndex}] [col-id=${columnId}].ag-cell`).contains(
        "✓"
      );
    });

    it(`computed column 'Unit Cost'`, () => {
      const columnId = "unitCost";
      // For this test, we only test that we computed a value;
      // we do not test the accuracy of the computation.
      cy.get(`[row-index=${rowIndex}] [col-id=${columnId}].ag-cell`)
        .contains("gram")
        .should("not.contain.text", "-");
    });
  }

  // Test that the table sorts properly.
  //
  // Note:
  //
  // The remaining [nice-to-have] sorting tests require more consideration of our
  // test arrangement. Sorting on requires having different values for different
  // rows. If we want to use the same test arrangement to test sorting and to test
  // editing, we need to figure out a new way of doing a test arrangement.
  //
  // TODO Test sort of the Supply Name column. Done.
  // TODO Test sort on the Supplier Name column. Done.
  // TODO Test sort on the Supply Type column. [nice-to-have] <-----
  // TODO Test sort on the Supply Units column. [nice-to-have] <-----
  // TODO Test sort on the Purchase Quantity column. Done.
  // TODO Test sort on the Purchase Price before Tax column. Done.
  // TODO Test sort on the Percent Waste column. Done.
  // TODO Test sort on the Has PST column. [nice-to-have] <-----
  // TODO Test sort on the Unit Cost column. Done.
  // See https://www.cypress.io/blog/2020/07/27/sorting-the-table/
  // See also https://blog.ag-grid.com/testing-with-ag-grid-vue-js-cypress/
  // Important: this only works if ag-grid sorts in the DOM not with CSS.
  [
    ...simpleTestCases,
    {
      columnHeader: "Unit Cost",
      columnId: "unitCost",
    },
  ].forEach(({ columnHeader, columnId }) => {
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
                cy.log("log me", cellsInnerText.join(","));
                cy.log("log me", reversed.join(","));
                expect(cellsInnerText, "cells are reversed").to.deep.equal(
                  reversed
                );
              });
          });
      });
    });
  });
});
