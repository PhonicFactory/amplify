/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';

// Initial State
const state = {
    status: 0,
    items: [],
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
};

// Getters
const getters = {
    allUsers: state => state.items,
    currentUser: state => state.items[0]
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
            // {
            //     "email": "groman911@gmail.com",
            //     "first_name": "Dude",
            //     "last_name": "Man",
            //     "phone_number": "+19739416607"
            // }

        api.post('users', {}, payload)
            .then((users) => {
                console.log(users);
                // const { items, limit, page, pages, total }
                // commit(types.RECIEVE_USER, users);
            })
            .catch((e) => {
                console.log(e);
            });
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
