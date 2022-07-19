// Create our number formatter.
var formatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

export default (value) => (isNaN(value) ? "-" : formatter.format(value));
