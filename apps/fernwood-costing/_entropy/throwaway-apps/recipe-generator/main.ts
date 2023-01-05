import recipeGenerator from "./index.ts";
import printReport from "./printReport.ts";
import database from "./data/database.ts";

const recipes = recipeGenerator(database);

// Dump
printReport(recipes, (r) => r.descriptiveName.includes("for_here"));
