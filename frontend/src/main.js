import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from './router';
import createStore from './store';

Vue.config.productionTip = false;

new Vue({
  store: createStore(),
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");