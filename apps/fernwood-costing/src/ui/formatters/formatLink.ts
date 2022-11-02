import formatDate from "./formatDate";

/*
 Before: "!!! Americano, 8 oz   and then ! foo !"
 After:  "americano-8-oz-and-then-foo"
*/
export default (path: string | Date) => {
  if (path instanceof Date) {
    return formatLinkDate(path);
  }

  return formatLinkString(path);
};

const formatLinkDate = (date: Date) =>
  formatLinkString(formatDate(date, "for-uri"));

const formatLinkString = (path: string) =>
  encodeURIComponent(path.replace(/[^a-zA-Z0-9]+/g, "-"))
    .replace(/^-|-$/g, "")
    .toLowerCase();
