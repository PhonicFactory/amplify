/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';

// Initial State
const state = {
    registration: null
};

// Getters
const getters = {
    serviceWorkerRegistration: state => state.registration
};

// Actions
const actions = {
    setServiceWorkerRegistration({ commit }, registration) {
        commit(types.RECEIVE_SERVICEWORKER_REGISTRATION, registration);
    }
};

// Mutations
const mutations = {
    [types.RECEIVE_SERVICEWORKER_REGISTRATION](state, registration) {
        state.registration = registration;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
