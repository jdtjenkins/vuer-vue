import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';

import LinkStore from './store/LinkStore';
import VuerComponent from './components/vuer.component';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

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
