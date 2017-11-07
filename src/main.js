import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import router from './routers/app';
import store from './store';

require('./components');

Vue.use(VueMaterial)
// Vue.use(VueMaterial.MdCore) //Required to boot vue material
// Vue.use(VueMaterial.MdButton)
// Vue.use(VueMaterial.MdBottomBar)
// Vue.use(VueMaterial.MdIcon)

Vue.material.registerTheme({
    default: {
        primary: 'blue',
        accent: 'red',
        warn: 'red',
        background: 'white'
    },
    inverse: {
        primary: 'white',
        accent: 'red',
        warn: 'red',
        background: 'blue'
    }
});

// Register service worker
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}

new Vue({
    router,
    store
}).$mount('#app');
