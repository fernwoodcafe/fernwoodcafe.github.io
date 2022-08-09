import { initializeRepository } from "@packages/data/excelDB";
import { createApp, reactive } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";

const status = reactive({
  message: "welcome",
});

const domainEventsRepo = initializeRepository();

domainEventsRepo.addListener("onSaved", (e) => (status.message = "saved"));
domainEventsRepo.addListener("onQueued", (e) => (status.message = "queued"));

const app = createApp(App, {
  status,
});

app.use(await router(domainEventsRepo));
app.mount("#app");
