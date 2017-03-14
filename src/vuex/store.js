//
import Vue from 'vue';
import Vuex from 'vuex';

// FILES.
import codebird from './Codebird';
import twitter from './Twitter';
import following from './Following';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    codebird,
    twitter,
    following
  }
});
