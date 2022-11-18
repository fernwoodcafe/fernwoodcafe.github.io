import tableTestCase from "../misc/tableTestCase";

const menuItemsToCreate = 3;

const simpleTestCases = [
  tableTestCase("Menu Item Name", "menuItemName", (i) => `${i}_menuItemName`),
];

describe("creates menu items", () => {
  before(() => {
    // Act
    cy.visit("/#/menu-items");

    // Act: Create and edit (n) menu items.
    for (let i = 0; i < menuItemsToCreate; ++i) {
      // Create the supply.
      cy.get('[value="New Menu Item"]').click();

      // Edit each simple column of the menu item.
      simpleTestCases.forEach(({ columnId, dummyValueForRowIndex }) => {
        cy.get(`[row-index=${i}] [col-id=${columnId}].ag-cell`)
          .type(dummyValueForRowIndex(i))
          .type("{enter}");
      });
    }
  });

  it(`has 'Delete' ${menuItemsToCreate} times`, () => {
    cy.get("input[value='Delete'").should("have.length", menuItemsToCreate);
  });

  for (let rowIndex = 0; rowIndex < menuItemsToCreate; ++rowIndex) {
    simpleTestCases.forEach(({ columnHeader, dummyValueForRowIndex }) => {
      it(`edited simple column '${columnHeader}'`, () => {
        cy.contains(dummyValueForRowIndex(rowIndex));
      });
    });
  }
});
