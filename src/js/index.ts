import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import VModal from 'vue-js-modal'
import PortalVue from 'portal-vue';

import LinkStore from './store/LinkStore';
import VuerComponent from './components/vuer.component';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('loading service worker');
        navigator.serviceWorker.register('/service-worker.js');
    });
}

Vue.use(Vuex);
Vue.use(VModal);
Vue.use(PortalVue);

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
