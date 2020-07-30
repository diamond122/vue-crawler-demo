import Vue from 'vue';
import Vuex from 'vuex';
import SiteModule from './site';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    modules: {
      $_site: SiteModule,
    },
  });
};
