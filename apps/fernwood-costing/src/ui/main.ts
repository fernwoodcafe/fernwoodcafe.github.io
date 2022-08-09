import { initializeRepository } from "@packages/data/excelDB";
import { createApp, reactive } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";

const status = reactive({
  message: "Welcome!",
});

const domainEventsRepo = initializeRepository();

domainEventsRepo.addListener("onSaved", () => (status.message = "Saved"));
domainEventsRepo.addListener("onQueued", () => (status.message = "Unsaved"));

const app = createApp(App, {
  status,
});

app.use(await router(domainEventsRepo));
app.mount("#app");
