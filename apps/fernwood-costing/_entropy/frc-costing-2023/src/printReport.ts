import { BusinessResult } from "./businessResult.ts";
import { BusinessStrategy } from "./businessStrategy.ts";

const isCurrency = (key: string, _value: unknown): _value is number =>
  key.endsWith("Currency");
const isPercent = (key: string, _value: unknown): _value is number =>
  key.endsWith("Percent");

const format = (record: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(record).map(([key, value]) => {
      if (isCurrency(key, value)) {
        return [
          key,
          value
            .toLocaleString("en-CA", { style: "currency", currency: "CAD" })
            .padStart(15, "."),
        ];
      }

      if (isPercent(key, value)) {
        return [key, `${value * 100}%`];
      }

      return [key, value];
    })
  );

const printJSON = (obj: Record<string, unknown>) =>
  console.log(JSON.stringify(format(obj), undefined, 2));

const printTable = (obj: Record<string, unknown>) => console.table(format(obj));

export default (
  businessStrategy: BusinessStrategy,
  businessResult: BusinessResult
) => {
  printJSON({
    target: format(businessStrategy),
    result: format(businessResult(businessStrategy)),
  });

  printTable(businessStrategy);
  printTable(businessResult(businessStrategy));
};
