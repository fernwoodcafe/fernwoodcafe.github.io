const columnWidth = 20;

const isCurrency = (key: string, _value: unknown): _value is number =>
  key.endsWith("Currency");

const isHours = (key: string, _value: unknown): _value is number =>
  key.endsWith("Hours");

const isPercent = (key: string, _value: unknown): _value is number =>
  key.endsWith("Percent");

const formatCurrency = (key: string, value: number) => [
  key.replace("Currency", ""),
  value
    .toLocaleString("en-CA", { style: "currency", currency: "CAD" })
    .padStart(columnWidth, " "),
];

const formatPercent = (key: string, value: number) => [
  key,
  `${value * 100}%`.padStart(columnWidth, " "),
];

const formatHours = (key: string, value: number) => [
  key,
  `${value.toFixed(2)} hrs`.padStart(columnWidth, " "),
];

const formatQuantity = (key: string, value: number) => [
  key,
  value.toFixed(2).padStart(columnWidth, " "),
];

const format = (record: SupportedReportData) =>
  Object.fromEntries(
    Object.entries(record)
      .map(([key, value]) => {
        if (isCurrency(key, value)) {
          return formatCurrency(key, value);
        }

        if (isPercent(key, value)) {
          return formatPercent(key, value);
        }

        if (isHours(key, value)) {
          return formatHours(key, value);
        }

        if (typeof value === "number") {
          return formatQuantity(key, value);
        }

        if (Array.isArray(value)) {
          return [key, value.join(", ")];
        }

        return [key, value];
      })
      .map(([key, value]) => [key, value.padStart(columnWidth, " ")])
  );

export type SupportedReportData = Record<string, number | string | string[]>;

export default (title: string, reportData: SupportedReportData) => {
  console.log();
  console.log(title);
  console.table(format(reportData));
};
