import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import LinkStore from './store/LinkStore';

import VuerComponent from './components/vuer.component';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        LinkStore: {
            namespaced: true,
            ...LinkStore,
        }
    }
})

new Vue({
  el: '#app',
  store,
  render: render => render(VuerComponent),
});
