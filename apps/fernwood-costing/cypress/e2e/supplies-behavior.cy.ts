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

    // Edit each of the (n) supplies
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

  // TODO Test that the table sorts properly.
  // See https://www.cypress.io/blog/2020/07/27/sorting-the-table/
  // See also https://blog.ag-grid.com/testing-with-ag-grid-vue-js-cypress/
  // Important: the second link has VueJS specific instructions.
  it("sorts by suppy name", () => {
    cy.get(".ag-theme-alpine").within(() => {
      cy.get("[col-id=supplyName].ag-cell")
        .then(toInnerText)
        // TODO [bug] For some reason, even the the items appear reversed on
        // the user interface, cypress.get fetches them in the non reversed
        // order. Wassup with that?
        .then((cellsInnerText) => {
          console.table(cellsInnerText);
          cy.log("beforeSort", cellsInnerText.join(","));
        });

      cy.contains(".ag-header-cell-label", "Supply Name")
        // The first click does not change the order,
        // because we added the supplies in order.
        .click()
        .click()
        .then(() => {
          cy.contains(".ag-header-cell-label", "Supply Name")
            .find("[ref=eSortDesc]")
            .should("be.visible");

          cy.get("[col-id=supplyName].ag-cell")
            .then(toInnerText)
            // TODO [bug] For some reason, even the the items appear reversed on
            // the user interface, cypress.get fetches them in the non reversed
            // order. Wassup with that?
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
