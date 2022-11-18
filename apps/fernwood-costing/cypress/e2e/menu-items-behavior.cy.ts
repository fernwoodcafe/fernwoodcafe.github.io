import tableTestCase from "../misc/tableTestCase";

const menuItemsToCreate = 3;

const simpleTestCases = [
  tableTestCase("Menu Item Name", "menuItemName", (i) => `${i}_menuItemName`),
  tableTestCase("Percent Total Sales", "percentTotalSales", (i) => `${i + 1}`),
  tableTestCase("Chosen Menu Price", "menuItemPrice", (i) => `${i + 1}`),
];

describe("creates menu items", () => {
  before(() => {
    cy.visit("/#/menu-items");

    // Create and edit (n) menu items.
    for (let i = 0; i < menuItemsToCreate; ++i) {
      // Create the menu item.
      cy.get('[value="New Menu Item"]').click();

      // Edit each simple column of the menu item.
      simpleTestCases.forEach(({ columnId, dummyValueForRowIndex }) => {
        cy.get(`[row-index=${i}] [col-id=${columnId}]`)
          .type(dummyValueForRowIndex(i))
          .type("{enter}");
      });
    }
  });

  it(`has 'Delete' ${menuItemsToCreate} times`, () => {
    cy.get("input[value='Delete'").should("have.length", menuItemsToCreate);
  });

  // Editable Columns
  // TODO Test edit of the Menu Item Name column. Done.
  // TODO Test edit of the Percent Total Sales column. Done.
  // TODO Test edit of the Chosen Menu Price column. Done.
  //
  // Non-editable columns.
  // TODO Test computation of the Total Cost column.
  // TODO Test computation of the Servings per Recipe column.
  // TODO Test computation of the Cost per Serving column.
  // TODO Test computation of the Baseline Price @ 3.5 Markup column.
  // TODO Test computation of the Markup column.
  // TODO Test computation of the Contribution column.
  for (let rowIndex = 0; rowIndex < menuItemsToCreate; ++rowIndex) {
    simpleTestCases.forEach(({ columnHeader, dummyValueForRowIndex }) => {
      it(`edited simple column '${columnHeader}'`, () => {
        cy.contains(dummyValueForRowIndex(rowIndex));
      });
    });
  }
});
