// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';

// Files.
import App from './App'
import router from './router'
import store from './vuex/store';

Vue.use(VueResource);
Vue.use(Vuex);

sync(store, router);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
