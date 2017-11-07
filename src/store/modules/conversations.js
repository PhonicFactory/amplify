/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';

// Initial State
const state = {
    // active: null,
    items: [],
    page: 1,
    status: 0
};

// Getters
const getters = {
    allConversations: state => state.items,
    allConversationsStatus: state => statuses[state.status]
    //,
    // activeConversation: state => state.active
};

// Actions
const actions = {
    getAllConversations({ commit }) {
        commit(types.REQUEST_CONVERSATIONS);
        setTimeout(() => {
            commit(types.RECEIVE_CONVERSATIONS, {
                "items": [
                    {
                        "id": "be8ed13c-4a0b-482d-b361-38f69b5b34a5",
                        "created_at": null,
                        "user_id": "165d16aa-aee5-11e7-8f2c-02b76c1bdb6e",
                        "from_number": "+14124326693",
                        "s3_location": "165d16aa-aee5-11e7-8f2c-02b76c1bdb6e/RE06795847ad7230d4b5ad6455fbf31959.wav",
                        "user" : {
                            "name": "Abbey Christansen",
                            "avatar": "https://placeimg.com/40/40/people/5",
                        }
                    },
                    {
                        "id": "be8ed13c-4a0b-482d-b361-38f69b5b34a6",
                        "created_at": null,
                        "user_id": "165d16aa-aee5-11e7-8f2c-02b76c1bdb62",
                        "from_number": "+14124326695",
                        "s3_location": "165d16aa-aee5-11e7-8f2c-02b76c1bdb6e/RE06795847ad7230d4b5ad6455fbf31959.wav",
                        "user" : {
                            "name": "Alex Nelson",
                            "avatar": "https://placeimg.com/40/40/people/6",
                        }
                    },
                    {
                        "id": "be8ed13c-4a0b-482d-b361-38f69b5b34a7",
                        "created_at": null,
                        "user_id": "165d16aa-aee5-11e7-8f2c-02b76c1bdb63",
                        "from_number": "+14124326694",
                        "s3_location": "165d16aa-aee5-11e7-8f2c-02b76c1bdb6e/RE06795847ad7230d4b5ad6455fbf31959.wav",
                        "user" : {
                            "name": "Mary Johnson",
                            "avatar": "https://placeimg.com/40/40/people/7",
                        }
                    },
                ],
                "total": 1,
                "page": 1,
                "pages": 1,
                "limit": 10
            });
        }, 1000);

        // axios.get('')
        //     .then((response) => {
        //         console.log(response);
        //     });
        // api.get('challenges', {}, { include: 'hashtag', limit: 10, cursor: state.page.next })
        //     .then(({ response, meta }) => {
        //         commit(types.RECEIVE_CHALLENGES, { response, meta });
        //     })
        //     .catch((e) => {
        //         commit(types.RECEIVE_CHALLENGES_FAILURE);
        //     });
    }
};

// Mutations
const mutations = {
    [types.REQUEST_CONVERSATIONS](state) {
        state.status = 0;
    },
    [types.RECEIVE_CONVERSATIONS](state, { items }) {
        state.items = items;
        state.status = 1;
    },
    [types.RECEIVE_CONVERSATIONS_FAILURE](state) {
        state.status = 2;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
