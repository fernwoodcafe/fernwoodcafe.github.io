// Create our number formatter.
var formatter = new Intl.NumberFormat("en-CA", {
  style: "percent",
});

export default (value) => (isNaN(value) ? "-" : formatter.format(value));
