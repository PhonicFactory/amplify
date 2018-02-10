/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';

// Initial State
const state = {
    status: null,
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
    getAllCalls({ commit }, conversation_id) {
        commit(types.REQUEST_CALLS);
        api.get('calls', { filter: `conversation:${conversation_id}` })
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
                headers: { 'Accept': 'audio/wav' },
                responseType: 'blob',
            })
            .then((call) => {
                var reader = new FileReader();
                reader.readAsDataURL(call);
                reader.onloadend = () => {
                    commit(types.RECEIVE_CALL_AUDIO, reader.result);
                }
            })
            .catch((e) => {
                console.log(e);
                // commit(types.RECEIVE_CALL_AUDIO_FAILURE);
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
