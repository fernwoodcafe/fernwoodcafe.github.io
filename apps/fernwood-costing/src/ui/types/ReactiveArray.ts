/**
 * We made `items` readonly to encourage immutability.
 * We have kinda made a VueJs `ref()` with an immutable `value` property.
 * See https://vuejs.org/guide/essentials/reactivity-fundamentals.html
 *
 * We might in the future use Immer if we would like "mutable ergonomics."
 * For now we feel happy with immutable ergonomics.
 * See also https://vuejs.org/guide/extras/reactivity-in-depth.html
 */
export type ReactiveArray<T> = {
  items: readonly T[];
};
