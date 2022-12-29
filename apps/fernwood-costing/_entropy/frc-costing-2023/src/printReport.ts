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
          value.toLocaleString("en-CA", { style: "currency", currency: "CAD" }),
        ];
      }

      if (isPercent(key, value)) {
        return [key, `${value * 100}%`];
      }

      return [key, value];
    })
  );

export default (
  businessStrategy: BusinessStrategy,
  businessResult: BusinessResult
) => {
  console.log(
    JSON.stringify(
      {
        target: format(businessStrategy),
        result: format(businessResult(businessStrategy)),
      },
      undefined,
      2
    )
  );
};
