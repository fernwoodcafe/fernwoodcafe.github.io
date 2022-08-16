/**
 * For instance...
 *
 * We might MUTATE a menuItem, because the MenuItemView component has a
 * reference to it. When we mutate it here, the MenuItemView receives
 * those updates, because object references work that way. Spooky action
 * at a distance! On the one hand, I feel unfortable with this mutate in
 * one place and see the changes in another place approach, because too
 * much magic happens. On the other hand, VueJs does a good job of keeping
 * all the mutuations in the parent and having the children react to those
 * changes. I do not know if we can re-pass immutable props to children
 * whenever the parent wants to change state.
 * Maybe: https://vuejs.org/guide/extras/reactivity-in-depth.html#immutable-data
 */
export default <T extends Record<string, unknown>>(record: T, changes: T) =>
  Object.keys(changes).forEach((key: keyof T) => {
    record[key] = changes[key];
  });
