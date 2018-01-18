/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';

// Initial State
const state = {
    status: 0,
    activeCall: null,
    items: [],
    // limit: 0,
    // page: 0,
    // pages: 0,
    // total: 0,
};

// Getters
const getters = {
    activeCall: state => state.activeCall,
    allCalls: state => state.items,
    allCallsStatus: state => statuses[state.status]
};

// Actions
const actions = {
    getAllCalls({ commit }) {
        commit(types.REQUEST_CALLS);
        api.get('calls', {})
            .then((calls) => {
                commit(types.RECEIVE_CALLS, calls);
            })
            .catch((e) => {
                console.log(e);
                commit(types.RECEIVE_CALLS_FAILURE);
            });
    },
    getCall({ commit }, id) {
        // commit(types.REQUEST_CALL);
        api.get('call', { id })
            .then((call) => {
                commit(types.RECEIVE_CALL, call);
            })
            .catch((e) => {
                console.log(e);
                // commit(types.RECEIVE_CALL_FAILURE);
            });
    }
};

// Mutations
const mutations = {
    [types.REQUEST_CALLS](state) {
        state.status = 0;
    },
    [types.RECEIVE_CALLS](state, calls) {
        // state = Object.assign(state, calls);
        state.items = calls.items;
        state.status = 1;
    },
    [types.RECEIVE_CALLS_FAILURE](state) {
        state.status = 2;
    },
    [types.RECEIVE_CALL](state, call) {
        // state = Object.assign(state, calls);
        state.activeCall = call;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
