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
