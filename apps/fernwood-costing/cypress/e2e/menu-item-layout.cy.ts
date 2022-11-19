describe("menu-item layout", () => {
  before(() => {
    cy.visit("/#/menu-items");
    cy.get('[value="New Menu Item"]').click();
    cy.get('[value="Edit"]').click();
  });

  // TODO Configure typescript to use es2015 or later here.
  const sections = [
    {
      sectionName: "Set Menu Item Price",
      fieldsets: [
        "Projected Percent Total Sales",
        "Chosen Price",
        "Base Price @ 3.5",
        "Actual Markup",
        "Percent Category Sales",
        "Weighted Markup",
      ],
    },
    {
      sectionName: "Add Menu Item Components",
      fieldsets: [
        "Add Ingredient",
        "Add Packaging",
        "Total Cost",
        "Servings per Recipe",
        "Cost per Serving",
      ],
    },
  ];

  sections.forEach(({ sectionName, fieldsets }) => {
    describe(`section '${sectionName}'`, () => {
      fieldsets.forEach((expectedText) => {
        it(`has expected fieldset ${expectedText}`, () => {
          cy.contains("section", sectionName).within(() => {
            cy.contains("form > fieldset", expectedText);
          });
        });
      });
    });
  });
});

export {};
