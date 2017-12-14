import Vue from 'vue';
import { mapGetters } from 'vuex';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import router from './routers/app';
import store from './store';
import { setAuthenticated } from './lib/auth';
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
        accent: 'red',
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
        // Set authenticated if session exists
        setAuthenticated();

        // Register service worker
        swRegister();
    },
    computed: {
        ...mapGetters({
            swRegistration: 'serviceWorkerRegistration',
            authenticated: 'authenticated'
        })
    },
    watch: {
        swRegistration() {
            console.log('service worker registered');

            // Ask for push notification permission
            subscribe();
        },
        authenticated(to, from) {
            console.log('authenticated state changed', to, from);
            // ignore initial flag
            if (from === null) {
                return;
            }
            if (to) {
                this.$router.push({ name: 'home' });
            } else {
                window.location.reload();
            }
        }
    }
}).$mount('#app');
