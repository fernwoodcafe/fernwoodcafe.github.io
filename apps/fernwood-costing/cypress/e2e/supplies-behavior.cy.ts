const suppliesToCreate = 5;

const toInnerText = (cells: JQuery<HTMLElement>) =>
  cells.toArray().map((c) => c.innerText);

describe("supplies behavior - creates supplies", () => {
  before(() => {
    // Act
    cy.visit("/#/supplies");

    // Create (n) supplies.
    for (let i = 0; i < suppliesToCreate; ++i) {
      cy.get('[value="New Supply"]').click();
    }

    // Edit each of the (n) supplies.
    // TODO This fails when the browser window does not have focus.
    // This is a known issue - do not fix with code. Instead in Chromium browsers
    // use this workaround: Ctrl + Shift + P + "Emulate a focused page"
    // See https://github.com/cypress-io/cypress/issues/5023
    // See also https://github.com/cypress-io/cypress/issues/21673
    for (let i = 0; i < suppliesToCreate; ++i) {
      cy.contains(`New Supply ${i}`).click();
      cy.focused().type(`${i}_supply`).blur();
    }
  });

  it(`has 'Delete' ${suppliesToCreate} times`, () => {
    cy.get("input[value='Delete'").should("have.length", suppliesToCreate);
  });

  it("renamed each of the supplies", () => {
    for (let i = 0; i < suppliesToCreate; ++i) {
      cy.contains(`${i}_supply`);
    }
  });

  // Test that the table sorts properly.
  // See https://www.cypress.io/blog/2020/07/27/sorting-the-table/
  // See also https://blog.ag-grid.com/testing-with-ag-grid-vue-js-cypress/
  // Important: this only works if ag-grid sorts in the DOM not with CSS.

  const columnsToSort = [["Supply Name", "supplyName"]].map((pair) => ({
    columnHeaderText: pair[0],
    columnId: pair[1],
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
