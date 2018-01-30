import VueRouter from 'vue-router';
import config from '../../config';

const HOST = config.apiHost;

export default new VueRouter({
    routes: [
        { path: `${HOST}/calls/`, name: 'calls' },
        { path: `${HOST}/calls/:id`, name: 'call' },
        { path: `${HOST}/users/`, name: 'users' },
        { path: `${HOST}/users/:id`, name: 'user' },
        { path: `${HOST}/subscriptions/`, name: 'push-subscriptions' }
    ]
});
