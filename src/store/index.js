import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import auth from './modules/auth';
import serviceWorker from './modules/service-worker';
import conversations from './modules/conversations';

const env = process.env;

Vue.use(Vuex);

export default new Store({
    modules: {
        auth,
        serviceWorker,
        conversations
    },
    strict: env.NODE_ENV !== 'production'
});
