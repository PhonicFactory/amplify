/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';

// Initial State
const state = {
    registration: null,
    pushManager: null,
    pushSubscription: null
};

// Getters
const getters = {
    serviceWorkerRegistration: state => state.registration,
    pushManager: state => state.pushManager,
    pushSubscription: state => state.pushSubscription
};

// Actions
const actions = {
    setServiceWorkerRegistration({ commit }, registration) {
        commit(types.RECEIVE_SERVICEWORKER_REGISTRATION, registration);
    },
    setPushSubscription({ commit }, subscription) {
        commit(types.RECEIVE_PUSH_SUBSCRIPTION, subscription);
    }
};

// Mutations
const mutations = {
    [types.RECEIVE_SERVICEWORKER_REGISTRATION](state, registration) {
        state.registration = registration;
        state.pushManager = registration.pushManager;
    },
    [types.RECEIVE_PUSH_SUBSCRIPTION](state, subscription) {
        state.pushSubscription = subscription;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
