/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import auth from '../../lib/auth';

// Initial State
const state = {
    authenticated: false,
    status: 0
};

// Getters
const getters = {
    authenticated: state => state.authenticated
};

// Actions
const actions = {
    login({ commit }) {
        // commit(types.SET_AUTHENTICATED, authenticated);
        //
    },
    setAuthenticated({ commit }, authenticated) {
        // commit(types.SET_AUTHENTICATED, authenticated);


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
