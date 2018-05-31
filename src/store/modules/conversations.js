/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';

// Initial State
const state = {
    allConversationsStatus: null,
    activeConversationStatus: null,
    activeConversation: null,
    items: []
};

// Getters
const getters = {
    activeConversation: state => state.activeConversation,
    allConversations: state => state.items,
    allConversationsStatus: state => statuses[state.allConversationsStatus],
    activeConversationStatus: state => statuses[state.activeConversationStatus]
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
        commit(types.RECEIVE_ACTIVE_CONVERSATION, conversation);
    },
    fetchActiveConversation({ commit }, id) {
        commit(types.REQUEST_ACTIVE_CONVERSATION);
        api.get('conversation', { id })
            .then(conversation => commit(types.RECEIVE_ACTIVE_CONVERSATION, conversation))
            .catch(e => commit(types.RECEIVE_ACTIVE_CONVERSATION_FAILURE, e));
    },
    createConversation({ commit }, payload) {
        commit(types.REQUEST_ACTIVE_CONVERSATION);
        api.post('conversations', {}, payload)
            .then(conversation => commit(types.RECEIVE_ACTIVE_CONVERSATION, conversation))
            .catch(e => commit(types.RECEIVE_ACTIVE_CONVERSATION_FAILURE, e));
    }
};

// Mutations
const mutations = {
    [types.REQUEST_CONVERSATIONS](state) {
        state.allConversationsStatus = 0;
    },
    [types.RECEIVE_CONVERSATIONS](state, conversations) {
        state.items = conversations.items;
        state.allConversationsStatus = 1;
    },
    [types.RECEIVE_CONVERSATIONS_FAILURE](state, e) {
        console.log('RECEIVE_CONVERSATIONS_FAILURE', e);
        state.allConversationsStatus = 2;
    },
    [types.RECEIVE_ACTIVE_CONVERSATION_FAILURE](state, e) {
        console.log('RECEIVE_CONVERSATION_FAILURE', e);
        state.activeConversationStatus = 2;
    },
    [types.REQUEST_ACTIVE_CONVERSATION](state) {
        state.activeConversationStatus = 0;
    },
    [types.RECEIVE_ACTIVE_CONVERSATION](state, conversation) {
        state.activeConversation = conversation;
        state.activeConversationStatus = 1;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
