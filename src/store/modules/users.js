/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';

// Initial State
const state = {
    items: [],
    status: null,
    registrationStatus: null,
    deleteUserStatus: null,
    // limit: 0,
    // page: 0,
    // pages: 0,
    // total: 0,
};

// Getters
const getters = {
    allUsers: state => state.items,
    currentUser: state => state.items[0],
    registrationStatus: state => statuses[state.registrationStatus],
    deleteUserStatus: state => statuses[state.deleteUserStatus]
};

// Actions
const actions = {
    getUsers({ commit }) {
        commit(types.REQUEST_USERS);
        api.get('users', {})
            .then((users) => {
                // const { items, limit, page, pages, total }
                commit(types.RECIEVE_USERS, users);
            })
            .catch((e) => {
                console.log(e);
            });
    },
    createUser({ commit }, payload) {
        commit(types.REQUEST_CREATE_USER);
        api.post('users', {}, payload)
            .then(() => commit(types.RECEIVE_CREATE_USER))
            .catch((e) => commit(types.RECEIVE_CREATE_USER_FAILURE, e));
    },
    deleteUser({ commit }, id) {
        commit(types.REQUEST_DELETE_USER);
        api.delete('user', { id })
            .then(() => commit(types.RECEIVE_DELETE_USER))
            .catch((e) => commit(types.RECEIVE_DELETE_USER_FAILURE, e));
    }
};

// Mutations
const mutations = {
    [types.REQUEST_USERS](state) {
        state.status = 0;
    },
    [types.RECIEVE_USERS](state, users) {
        state.items = users.items;
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
    },
    [types.REQUEST_DELETE_USER](state) {
        state.deleteUserStatus = 0;
    },
    [types.RECEIVE_DELETE_USER](state) {
        state.deleteUserStatus = 1;
    },
    [types.RECEIVE_DELETE_USER_FAILURE](state, error) {
        state.deleteUserStatus = 2;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
