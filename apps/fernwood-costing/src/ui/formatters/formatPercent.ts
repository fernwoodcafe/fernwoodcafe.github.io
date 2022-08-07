// Create our number formatter.
const formatter = new Intl.NumberFormat("en-CA", {
  style: "percent",
});

export default (value) => (isNaN(value) ? "-" : formatter.format(value));
