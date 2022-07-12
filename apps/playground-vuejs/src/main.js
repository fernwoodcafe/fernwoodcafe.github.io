import App from "@/App.vue";
import counter from "@/router";
import { createApp } from "vue";

const app = createApp(App);

app.use(counter);

app.mount("#app");
