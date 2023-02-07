import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// use pinia
import { createPinia } from "pinia";
Vue.use(createPinia());

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
