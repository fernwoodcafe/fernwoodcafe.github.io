export default (
  menuItemMarkup: number,
  menuItemPercentCategorySales: number
) => {
  if (menuItemPercentCategorySales === 0) {
    return 0;
  }

  return menuItemMarkup * menuItemPercentCategorySales;
};
