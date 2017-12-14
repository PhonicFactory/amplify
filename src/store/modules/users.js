/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';

// Initial State
const state = {
    status: 0,
    registrationStatus: 0,
    items: [],
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
};

// Getters
const getters = {
    allUsers: state => state.items,
    currentUser: state => state.items[0],
    registrationStatus: state => statuses[state.registrationStatus]
};

// Actions
const actions = {
    getUsers({ commit }) {
        commit(types.REQUEST_USER);
        api.get('users', {})
            .then((users) => {
                // const { items, limit, page, pages, total }
                commit(types.RECIEVE_USER, users);
            })
            .catch((e) => {
                console.log(e);
            });
    },
    createUser({ commit }, payload) {
        commit(types.REQUEST_CREATE_USER);
        api.post('users', {}, payload)
            .then(() => commit(types.RECEIVE_CREATE_USER))
            .catch((e) => commit(types.RECEIVE_CREATE_USER_FAILURE, e))
    }
};

// Mutations
const mutations = {
    [types.REQUEST_USER](state) {
        state.status = 0;
    },
    [types.RECIEVE_USER](state, users) {
        state = Object.assign(state, users);
        state.status = 1;
    },
    [types.REQUEST_CREATE_USER](state) {
        state.registrationStatus = 0;
    },
    [types.RECEIVE_CREATE_USER](state) {
        state.registrationStatus = 1;
    },
    [types.RECEIVE_CREATE_USER_FAILURE](state, error) {
        state.registrationStatus = 2;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
