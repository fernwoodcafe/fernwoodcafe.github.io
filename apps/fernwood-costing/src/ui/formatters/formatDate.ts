export default (value: Date) => {
  if (!value) return "";
  if (isNaN(value.getDate())) return "";

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return value.toLocaleDateString("en-ca", options);
};
