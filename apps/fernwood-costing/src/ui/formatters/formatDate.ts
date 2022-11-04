type DateFormat = "for-human" | "for-uri";

const isValidDate = (input: unknown): input is Date => {
  if (input instanceof Date) {
    const date = input.getDate();

    if (isNaN(date)) {
      // We have an invalid date.
      return false;
    }

    // We have a valid date.
    return true;
  }

  // We do not even have a date.
  return false;
};

export default (input: Date, format: DateFormat = "for-human") => {
  if (!isValidDate(input)) return "";

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
