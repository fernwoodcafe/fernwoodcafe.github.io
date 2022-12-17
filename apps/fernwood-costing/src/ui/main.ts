import {
  handleCommand,
  materializeCompositeSupplies,
  materializeInventorySheets,
  materializeMenuItems,
  materializeSupplies
} from "@packages/cqrs-es";
import { initializeRepository as initializeProductionRepository } from "@packages/data/excelDB";
import { initializeRepository as initializeTestRepository } from "@packages/data/indexedDB";
import type {
  CafeEventUnion,
  CafeGoals,
  SupplyTaxes
} from "@packages/domain/types";
import { createApp, reactive } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import type { AppStatus } from "./types";

const appStatus = reactive<AppStatus>({
  message: "Welcome!",
});

const cafeGoals = reactive<CafeGoals>({
  targetWeightedAverageMarkup: 3.5,
});

const supplyTaxes = reactive<SupplyTaxes>({
  PST: 0.06,
});

const domainEventsRepo =
  import.meta.env.MODE === "production"
    ? await initializeProductionRepository()
    : await initializeTestRepository();

domainEventsRepo.addListener("onSaved", () => (appStatus.message = "Saved"));
domainEventsRepo.addListener("onQueued", () => (appStatus.message = "Unsaved"));
const domainEvents = (await domainEventsRepo.select()) as CafeEventUnion[];

const menuItemsList = materializeMenuItems(
  reactive({ items: [] }),
  ...domainEvents
);

const suppliesList = materializeSupplies(
  reactive({ items: [] }),
  ...domainEvents
);

const inventorySheetsList = materializeInventorySheets(
  reactive({ items: [] }),
  ...domainEvents
);

const compositeSuppliesList = materializeCompositeSupplies(
  reactive({ items: [] }),
  ...domainEvents
);

// Possible Design for Multi-User/Tab via Change Notifications
// 1. Listen for new events.
// 2. If a new event comes in, pass it to the materializer.
// 3. Then also remove the materializer from the command handler.
// See https://learn.microsoft.com/en-us/graph/api/resources/webhooks?view=graph-rest-1.0
// See also https://learn.microsoft.com/en-us/graph/api/resources/driveitem?view=graph-rest-1.0
// See also https://learn.microsoft.com/en-us/graph/webhooks

const sendCommand = handleCommand({
  menuItemsList,
  materializeMenuItems,
  suppliesList,
  materializeSupplies,
  compositeSuppliesList,
  materializeCompositeSupplies,
  inventorySheetsList,
  materializeInventorySheets,
  domainEventsRepo,
});

const app = createApp(App, {
  status: appStatus,
});

app
  .use(
    router({
      menuItemsList,
      suppliesList,
      inventorySheetsList,
      compositeSuppliesList,
      cafeGoals,
      supplyTaxes,
      sendCommand,
    })
  )
  .mount("#app");
