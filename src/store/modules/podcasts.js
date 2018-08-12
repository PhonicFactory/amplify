const staticPodcasts = require('../../../static/json/podcasts.json');

// Mutation Types
const types = {
  REQUEST_PODCASTS: 'REQUEST_PODCASTS',
  RECEIVE_PODCASTS: 'RECEIVE_PODCASTS',
  SET_ACTIVE_PODCAST: 'SET_ACTIVE_PODCAST'
};

// Initial State
const state = {
    items: [],
    active: null
};

// Getters
const getters = {
    allPodcasts: state => state.items,
    activePodcast: state => state.active
};

// Actions
const actions = {
    getAllPodcasts({ commit }) {
        commit(types.REQUEST_PODCASTS);
        setTimeout(() => {
          commit(types.RECEIVE_PODCASTS, staticPodcasts);
        }, 1000);
    },
    setActivePodcast({ commit }, podcast) {
        commit(types.SET_ACTIVE_PODCAST, podcast);
    }
};

// Mutations
const mutations = {
    [types.REQUEST_PODCASTS](state) {},
    [types.RECEIVE_PODCASTS](state, podcasts) {
        state.items = podcasts.items
    },
    [types.SET_ACTIVE_PODCAST](state, podcast) {
        state.active = podcast;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
