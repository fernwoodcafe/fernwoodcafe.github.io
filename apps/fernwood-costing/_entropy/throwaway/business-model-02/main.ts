import printReport from "./printReport.ts";
import salesGrossProfitReport from "./salesGrossProfitReport.ts";
import salesPercentReport from "./salesPercentReport.ts";
import topTenEspressoBarItemSales from "./topTenEspressoBarItemSales.ts";

topTenEspressoBarItemSales.pipeInto((x) => {
  salesPercentReport(x).pipeInto(printReport);
  salesGrossProfitReport(x).pipeInto(printReport);
});
