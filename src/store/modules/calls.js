/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';
import { blobToBase64 } from '../../lib/helpers';

// Initial State
const state = {
    status: null,
    activeCall: null,
    items: [],
    postMessageStatus: null
    // limit: 0,
    // page: 0,
    // pages: 0,
    // total: 0,
};

// Getters
const getters = {
    activeCall: state => state.activeCall,
    allCalls: state => state.items,
    allCallsStatus: state => statuses[state.status],
    postMessageStatus: state => statuses[state.postMessageStatus]
};

// Actions
const actions = {
    getAllCalls({ commit }, conversation_id) {
        commit(types.REQUEST_CALLS);
        api.get('calls', {}, { filter: `conversation:${conversation_id}` })
            .then((calls) => {
                commit(types.RECEIVE_CALLS, calls);
            })
            .catch((e) => {
                console.log(e);
                commit(types.RECEIVE_CALLS_FAILURE);
            });
    },
    clearAllCalls({ commit }) {
        commit(types.CLEAR_CALLS);
    },
    getCallAudio({ commit }, call) {
        commit(types.REQUEST_CALL_AUDIO, call);
        api.get('call', { id: call.id }, {}, {
                headers: { 'Accept': 'audio/webm' },
                responseType: 'blob',
            })
            .then((callAudio) => {
                blobToBase64(callAudio)
                    .then((result) => {
                        commit(types.RECEIVE_CALL_AUDIO, result);
                    })
                    .catch((e) => {
                        console.log(e);
                        // commit(types.RECEIVE_CALL_AUDIO_FAILURE);
                    });
            })
            .catch((e) => {
                console.log(e);
                // commit(types.RECEIVE_CALL_AUDIO_FAILURE);
            });
    },
    startNewCallAudio({ commit }) {
        commit(types.START_NEW_CALL_AUDIO);
    },
    postCallAudio({ commit }, payload) {
        commit(types.REQUEST_POST_MESSAGE);
        api.post('calls', {}, payload)
            .then((response) => {
                commit(types.RECEIVE_POST_MESSAGE);
            })
            .catch((e) => {
                console.log(e);
                commit(types.RECEIVE_POST_MESSAGE_FAILURE);
            });
    },
    clearActiveCall({ commit }) {
        commit(types.CLEAR_ACTIVE_CALL);
    }
};

// Mutations
const mutations = {
    [types.REQUEST_CALLS](state) {
        state.status = 0;
    },
    [types.RECEIVE_CALLS](state, calls) {
        state.items = calls.items;
        state.status = 1;
    },
    [types.CLEAR_CALLS](state) {
        state.items = [];
    },
    [types.RECEIVE_CALLS_FAILURE](state) {
        state.status = 2;
    },
    [types.REQUEST_CALL_AUDIO](state, call) {
        state.activeCall = call;
    },
    [types.RECEIVE_CALL_AUDIO](state, audio) {
        state.activeCall = Object.assign({}, state.activeCall, { audio });
    },
    [types.CLEAR_ACTIVE_CALL](state) {
        state.activeCall = null;
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
    [types.START_NEW_CALL_AUDIO](state) {
        state.postMessageStatus = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
