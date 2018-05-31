import VueRouter from 'vue-router';
import config from '../../config';

const HOST = config.apiHost;

export default new VueRouter({
    routes: [
        { path: `${HOST}/messages/`, name: 'messages' },
        { path: `${HOST}/messages/:id`, name: 'message' },
        { path: `${HOST}/conversations/`, name: 'conversations' },
        { path: `${HOST}/conversations/:id`, name: 'conversation' },
        { path: `${HOST}/users/`, name: 'users' },
        { path: `${HOST}/users/:id`, name: 'user' },
        { path: `${HOST}/subscriptions/`, name: 'push-subscriptions' }
    ]
});
