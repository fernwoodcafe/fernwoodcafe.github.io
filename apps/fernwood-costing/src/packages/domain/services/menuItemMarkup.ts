export default (menuItemPrice: number, menuItemCost: number) => {
  const markup = menuItemPrice / menuItemCost;
  return isNaN(markup) ? 0 : markup;
};
