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
  getAll() {
    return supplies;
  },
  insert(supply) {
    supplies.push(supply);
  },
};
