const supplies = [
  {
    supplyId: "12 oz Cups",
    supplierId: "Green Munch",
  },
  {
    supplyId: "Espresso Beans",
    supplierId: "Drumroasters",
  },
];

export default {
  select() {
    return supplies;
  },
  insert(supply) {
    supplies.push(supply);
  },
};
