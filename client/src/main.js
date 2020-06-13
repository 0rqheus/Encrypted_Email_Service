import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { store } from "./store";

Vue.use(BootstrapVue);
Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store: store,
    components: { App },
    template: "<App/>"
});