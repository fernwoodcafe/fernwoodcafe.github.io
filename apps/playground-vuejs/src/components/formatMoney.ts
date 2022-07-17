export default (value) => (isNaN(value) ? "-" : `$${value}`);
