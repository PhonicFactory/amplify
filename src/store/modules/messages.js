/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';
import { blobToBase64 } from '../../lib/helpers';

// Initial State
const state = {
    status: null,
    activeMessage: null,
    items: [],
    postMessageStatus: null
    // limit: 0,
    // page: 0,
    // pages: 0,
    // total: 0,
};

// Getters
const getters = {
    activeMessage: state => state.activeMessage,
    allMessages: state => state.items,
    allMessagesStatus: state => statuses[state.status],
    postMessageStatus: state => statuses[state.postMessageStatus]
};

// Actions
const actions = {
    getAllMessages({ commit }, conversation_id) {
        commit(types.REQUEST_MESSAGES);
        api.get('messages', {}, { filter: `conversation:${conversation_id}` })
            .then((messages) => {
                commit(types.RECEIVE_MESSAGES, messages);
            })
            .catch((e) => {
                console.log(e);
                commit(types.RECEIVE_MESSAGES_FAILURE);
            });
    },
    clearAllMessages({ commit }) {
        commit(types.CLEAR_MESSAGES);
    },
    getMessageAudio({ commit }, message) {
        commit(types.REQUEST_MESSAGE_AUDIO, message);
        api.get('message', { id: message.id }, {}, {
                headers: { 'Accept': 'audio/webm' },
                responseType: 'blob',
            })
            .then((messageAudio) => {
                blobToBase64(messageAudio)
                    .then((result) => {
                        commit(types.RECEIVE_MESSAGE_AUDIO, result);
                    })
                    .catch((e) => {
                        console.log(e);
                        // commit(types.RECEIVE_MESSAGE_AUDIO_FAILURE);
                    });
            })
            .catch((e) => {
                console.log(e);
                // commit(types.RECEIVE_MESSAGE_AUDIO_FAILURE);
            });
    },
    startNewMessageAudio({ commit }) {
        commit(types.START_NEW_MESSAGE_AUDIO);
    },
    postMessageAudio({ commit }, payload) {
        commit(types.REQUEST_POST_MESSAGE);
        api.post('messages', {}, payload)
            .then((response) => {
                commit(types.RECEIVE_POST_MESSAGE);
            })
            .catch((e) => {
                console.log(e);
                commit(types.RECEIVE_POST_MESSAGE_FAILURE);
            });
    },
    clearActiveMessage({ commit }) {
        commit(types.CLEAR_ACTIVE_MESSAGE);
    }
};

// Mutations
const mutations = {
    [types.REQUEST_MESSAGES](state) {
        state.status = 0;
    },
    [types.RECEIVE_MESSAGES](state, messages) {
        state.items = messages.items;
        state.status = 1;
    },
    [types.CLEAR_MESSAGES](state) {
        state.items = [];
    },
    [types.RECEIVE_MESSAGES_FAILURE](state) {
        state.status = 2;
    },
    [types.REQUEST_MESSAGE_AUDIO](state, message) {
        state.activeMessage = message;
    },
    [types.RECEIVE_MESSAGE_AUDIO](state, audio) {
        state.activeMessage = Object.assign({}, state.activeMessage, { audio });
    },
    [types.CLEAR_ACTIVE_MESSAGE](state) {
        state.activeMessage = null;
    },
    [types.REQUEST_POST_MESSAGE](state) {
        state.postMessageStatus = 0;
    },
    [types.RECEIVE_POST_MESSAGE](state) {
        state.postMessageStatus = 1;
    },
    [types.RECEIVE_POST_MESSAGE_FAILURE](state) {
        state.postMessageStatus = 2;
    },
    [types.START_NEW_MESSAGE_AUDIO](state) {
        state.postMessageStatus = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
