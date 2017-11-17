/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';

// Initial State
const state = {
    authenticated: null
};

// Getters
const getters = {
    authenticated: state => state.authenticated
};

// Actions
const actions = {
    setAuthenticated({ commit }, authenticated) {
        commit(types.SET_AUTHENTICATED, authenticated);
    }
};

// Mutations
const mutations = {
    [types.SET_AUTHENTICATED](state, authenticated) {
        state.authenticated = authenticated;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
