import Vue from 'vue';
import { mapGetters } from 'vuex';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import router from './routers/app';
import store from './store';
import { register as swRegister } from './lib/service-worker';
import { subscribe } from './lib/push-notifications';

/**
 * Register custom components
 */
require('./components');

/**
 * Register vue material components and themes
 */
Vue.use(VueMaterial)
// Vue.use(VueMaterial.MdCore) //Required to boot vue material
// Vue.use(VueMaterial.MdButton)
// Vue.use(VueMaterial.MdBottomBar)
// Vue.use(VueMaterial.MdIcon)
Vue.material.registerTheme({
    default: {
        primary: {
            color: 'orange',
            hue: 800
        },
        accent: 'red',
        warn: 'red',
        background: 'white'
    },
    inverse: {
        primary: 'white',
        accent: {
            color: 'orange',
            hue: 800
        },
        warn: 'red',
        background: {
            color: 'orange',
            hue: 800
        }
    }
});

/**
 * Initialize Vue app
 */
new Vue({
    router,
    store,
    created() {
        // Register service worker
        swRegister();
    },
    computed: {
        ...mapGetters({
            swRegistration: 'serviceWorkerRegistration'
        })
    },
    watch: {
        swRegistration() {
            console.log('service worker registered');

            // Ask for push notification permission
            subscribe();
        }
    }
}).$mount('#app');
