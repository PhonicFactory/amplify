import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import './styles/main.scss';
import router from './routers/app';
import store from './store';
import { register as swRegister } from './lib/service-worker';
import { getSubscription, setSubscription } from './lib/push-notifications';

/**
 * Register custom components
 */
require('./components');

/**
 * Register vue material components and themes
 */
Vue.use(VueMaterial)
Vue.material.registerTheme({
    default: {
        primary: {
            color: 'blue',
            hue: 800
        },
        accent: {
            color: 'blue',
            hue: 500
        },
        warn: 'red',
        background: 'white'
    },
    inverse: {
        primary: 'white',
        accent: {
            color: 'blue',
            hue: 800
        },
        warn: 'red',
        background: {
            color: 'blue',
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
        // Fetch user data if authed
        if (this.authenticated) {
            this.getUsers();
        }
    },
    computed: {
        ...mapGetters({
            swRegistration: 'serviceWorkerRegistration',
            authenticated: 'authenticated',
            currentUser: 'currentUser'
        })
    },
    watch: {
        authenticated(bool) {
            if (bool) {
                this.getUsers();
            }
        },
        currentUser() {
            // Set existing push subscription
            getSubscription().then(subscription => setSubscription(subscription));
        }
    },
    methods: {
        ...mapActions([
            'getUsers',
            ''
        ])
    }
}).$mount('#app');
