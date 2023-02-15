2022-12-28

It would seem that a consistent markup of 4 (for example) across all ingredients
does not apply effectively, because the prices end up as asymmetrical.

For instance, adding another shot to the latte increases by $2 to $5.99.

12 oz 2 shot dairy_3_percent for_here $3.99
12 oz 4 shot dairy_3_percent for_here $5.99

Possible approaches to going from _cost_ to _price_.

1. Systematically decrease the markup as the cost of the order increases.
2. Aim for an average markup across all items instead of a consistent markup.
3. Model the business as `left_over` = `gross_income` - `cogs` - `staffing_cost` - `overhead`

2022-12-26

The current goal: program the 2023 latte into Square through CSV import.

Bits:

* How do we set the price for each of the modifiers?
* Can we make the price interactive (ie, as a function of _all_ modifiers)?
* Or do we need to have one-and-only-one price per option?
* What kinds of dynamic pricing, if any, does Square support?

Questions:

* How does category theory represent multiplication in a graph?
* How does category theory represent addition in a graph?

2022-12-22

Test column sorting in the MenuItemView. Done.

Worth study: https://github.com/cypress-io/cypress-realworld-app

2022-12-19

Except for show stoppers, stop feature development until January 16, 2023.

Instead, focus on _using_ the app instead of _building_ the app.

Record tempting development work / bug fixes in ./tasks/index.csv.

2022-12-17

To start Cypress with hot module reloading do this:

1. Terminal A `npm run dev`
2. Terminal B `npm run cypress`

Note that it takes about a minute from Cypress to start and open a window.

2022-11-29

- Experimented with Immer. Not sure whether to go ahead or not.
- We already seem to do a lot of immutable stuff in our materializers.
- Need to give VueJs reactivity and immutability more thought.
- https://vuejs.org/guide/essentials/reactivity-fundamentals.html
- https://vuejs.org/guide/extras/reactivity-in-depth.html
- And... finish Cypress functional tests first before refactoring.

Reactivity:

- Use `reactive` for objects/arrays/etc.
- Use `ref` for primitives.
- The `ref` gives us the `.value` that lets us swap references!
- "... ref() allows us to create a "reference" to any value and pass it around without losing reactivity."
- https://vuejs.org/guide/essentials/reactivity-fundamentals.html

After adding Cypress functional tests
... introduce more Domain Driven Design value types.