export default (menuItemCost: number, menuItemPrice: number) => {
  const markup = menuItemPrice / menuItemCost;
  return isNaN(markup) ? "-" : markup.toFixed(2);
};
