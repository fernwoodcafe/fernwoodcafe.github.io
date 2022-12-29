import businessResult from "./businessResult.ts";
import businessStrategy from "./businessStrategy.ts";
import printReport from "./printReport.ts";

businessStrategy.forEach((strategy) => {
  printReport(strategy, businessResult);
});
