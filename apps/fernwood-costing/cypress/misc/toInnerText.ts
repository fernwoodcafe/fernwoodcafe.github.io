export default (cells: JQuery<HTMLElement>) =>
  cells.toArray().map((c) => c.innerText);
