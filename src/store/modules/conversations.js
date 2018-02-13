/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';

// Initial State
const state = {
    status: null,
    activeConversation: null,
    items: []
};

// Getters
const getters = {
    activeConversation: state => state.activeConversation,
    allConversations: state => state.items,
    allConversationsStatus: state => statuses[state.status]
};

// Actions
const actions = {
    getAllConversations({ commit }) {
        commit(types.REQUEST_CONVERSATIONS);
        api.get('conversations')
            .then(conversations => commit(types.RECEIVE_CONVERSATIONS, conversations))
            .catch(e => commit(types.RECEIVE_CONVERSATIONS_FAILURE, e));
    },
    setActiveConversation({ commit }, conversation) {
        commit(types.SET_ACTIVE_CONVERSATION, conversation);
    },
    fetchActiveConversation({ commit }, id) {
        api.get('conversation', { id })
            .then(conversation => commit(types.SET_ACTIVE_CONVERSATION, conversation))
            .catch(e => commit(types.RECEIVE_CONVERSATION_FAILURE, e));
    }
};

// Mutations
const mutations = {
    [types.REQUEST_CONVERSATIONS](state) {
        state.status = 0;
    },
    [types.RECEIVE_CONVERSATIONS](state, conversations) {
        state.items = conversations.items;
        state.status = 1;
    },
    [types.RECEIVE_CONVERSATIONS_FAILURE](state, e) {
        console.log('RECEIVE_CONVERSATIONS_FAILURE', e);
        state.status = 2;
    },
    [types.RECEIVE_CONVERSATION_FAILURE](state, e) {
        console.log('RECEIVE_CONVERSATION_FAILURE', e);
    },
    [types.SET_ACTIVE_CONVERSATION](state, conversation) {
        state.activeConversation = conversation;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
