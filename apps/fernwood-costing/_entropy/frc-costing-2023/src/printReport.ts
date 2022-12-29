import { BusinessResult } from "./businessResult.ts";
import { BusinessStrategy } from "./businessStrategies.ts";

const columnWidth = 15;

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

const format = (record: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(record).map(([key, value]) => {
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

      console.log(typeof value);

      return [key, value];
    })
  );

const printTable = (title: string, record: Record<string, unknown>) => {
  console.log();
  console.log(title);
  console.table(format(record));
};

export default (
  businessStrategy: BusinessStrategy,
  businessResult: BusinessResult
) => {
  printTable("Strategy", businessStrategy);
  printTable("Result", businessResult(businessStrategy));
};
