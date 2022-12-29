import businessResult from "./businessResult.ts";
import businessStrategy from "./businessStrategies.ts";
import printReport from "./printReport.ts";

businessStrategy.forEach((strategy) => {
  printReport(strategy, businessResult(strategy));
});
