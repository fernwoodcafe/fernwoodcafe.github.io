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

domainEventsRepo.addListener("onClientDomainEventSaved", () => (appStatus.message = "Saved"));
domainEventsRepo.addListener("onClientDomainEventQueued", () => (appStatus.message = "Unsaved"));
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

// This supports a multi-user and multi-tab user interface by feeding new events
// from the server into the materializers.
domainEventsRepo.addListener("onServerDomainEventArrived", () =>
{
  // For this to work reliably, we need to follow order strictly.
  // 1. Persist the event to the event store.
  // 2. Materialize the event with the materializer.
  // Alternatively, we need to figure out how to merge events that came from other
  // clients with events that came from the current client. Yikes!
  console.log('New event arrived at server!');
})

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
