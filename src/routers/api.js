import VueRouter from 'vue-router';
import config from '../../config';

const HOST = config.apiHost;

export default new VueRouter({
    routes: [
        { path: `${HOST}/messages/`, name: 'calls' },
        { path: `${HOST}/messages/:id`, name: 'call' },  // TODO: update store to use 'messages' not 'calls'
        { path: `${HOST}/conversations/`, name: 'conversations' },
        { path: `${HOST}/conversations/:id`, name: 'conversation' },
        { path: `${HOST}/users/`, name: 'users' },
        { path: `${HOST}/users/:id`, name: 'user' },
        { path: `${HOST}/subscriptions/`, name: 'push-subscriptions' }
    ]
});
