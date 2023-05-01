import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLandmark,
  faLocationDot,
  faSpinner,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faTwitter,
  faFacebook,
  faLinkedin,
  faInstagram,
  faLandmark,
  faLocationDot,
  faSpinner,
  faSquare,
  faSquareCheck
);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
