/*
 Before: "!!! Americano, 8 oz   and then ! foo !"
 After:  "americano-8-oz-and-then-foo"
*/
export default (path: string) =>
  encodeURIComponent(path.replace(/[^a-zA-Z0-9]+/g, "-"))
    .replace(/^-|-$/g, "")
    .toLowerCase();
