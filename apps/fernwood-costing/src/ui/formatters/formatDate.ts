type DateFormat = "for-human" | "for-uri";

export default (input: Date, format: DateFormat = "for-human") => {
  if (!input) return "";
  if (isNaN(input.getDate())) return "";

  switch (format) {
    case "for-uri":
      return formatDateForUri(input);
    default:
      return formatDateForHuman(input);
  }
};

const formatDateForHuman = (input: Date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return input.toLocaleDateString("en-ca", options);
};

const formatDateForUri = (input: Date) => {
  return input.toISOString().split("T")[0];
};