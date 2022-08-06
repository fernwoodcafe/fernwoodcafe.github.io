const smallPerBig = {
  ["ounce-mass/pound"]: 16,
  ["gram/pound"]: 453.5924,
  ["gram/kilogram"]: 1000,
  ["pound/kilogram"]: 2.20462,
  ["ounce-fluid-us/liter"]: 33.814,
  ["ounce-fluid-us/millilter"]: 0.033814,
};

export default Object.entries(smallPerBig).reduce((acc, [key, value]) => {
  const reverseKey = key.split("/").reverse().join("/");
  const reverseValue = 1 / value;
  acc[reverseKey] = reverseValue;
  return acc;
}, smallPerBig);
