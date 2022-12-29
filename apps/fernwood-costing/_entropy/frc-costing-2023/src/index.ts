import businessResult from "./businessResult.ts";
import businessStrategy from "./businessStrategies.ts";
import labourResult from "./labourResult.ts";
import labourStrategy from "./labourStrategies.ts";
import printReport from "./printReport.ts";

businessStrategy.forEach((businessStrategy) => {
  printReport("Business Strategy", businessStrategy);
  printReport("Business Strategy Result", businessResult(businessStrategy));
  printReport("Labour Strategy", labourStrategy);
  printReport("Labour Result", labourResult);
});
