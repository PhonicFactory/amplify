import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import conversations from './modules/conversations';

const env = process.env;

Vue.use(Vuex);

export default new Store({
    modules: {
        conversations
    },
    strict: env.NODE_ENV !== 'production'
});
