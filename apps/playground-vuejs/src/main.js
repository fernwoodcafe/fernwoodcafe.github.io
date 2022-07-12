import { createApp } from "vue";
import App from "./App.vue";
import counter from "./router";

const app = createApp(App);

app.use(counter);

app.mount("#app");
