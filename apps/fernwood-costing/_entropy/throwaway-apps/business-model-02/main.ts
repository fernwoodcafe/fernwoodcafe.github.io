import printReport from "./printReport.ts";
import salesGrossProfitReport from "./salesGrossProfitReport.ts";
import salesPercentReport from "./salesPercentReport.ts";
import topTenEspressoBarItemSales from "./topTenEspressoBarItemSales.ts";

topTenEspressoBarItemSales.pipeInto((itemSales) => {
  salesPercentReport(itemSales).pipeInto(printReport);
  salesGrossProfitReport(itemSales).pipeInto(printReport);
});
