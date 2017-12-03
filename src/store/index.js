import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import auth from './modules/auth';
import serviceWorker from './modules/service-worker';
import calls from './modules/calls';
import users from './modules/users';

const env = process.env;

Vue.use(Vuex);

export default new Store({
    modules: {
        auth,
        serviceWorker,
        calls,
        users
    },
    strict: env.NODE_ENV !== 'production'
});
