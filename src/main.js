// src/main.js

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css"; // Import the MDI icons CSS

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

// Function to dynamically mount the widget
function mountWidget(selector = "#app") {
  const container = document.querySelector(selector);

  if (container) {
    const app = createApp(App);
    app.use(router);
    app.use(store);
    app.use(vuetify);
    app.mount(container);
  } else {
    console.error(`No element found for selector ${selector}`);
  }
}

// Check if the app is embedded (i.e., #widget-container exists)
const isEmbedded = document.querySelector("#widget-container");

// Mount to the specific container (#widget-container) if embedding, otherwise mount to #app
if (isEmbedded) {
  // Mount the widget into the external container (e.g., #widget-container)
  mountWidget("#widget-container");
} else {
  // Mount the regular app to #app (default for development)
  mountWidget("#app");
}

// Expose the mountWidget function globally for external embedding
window.mountWidget = mountWidget;
