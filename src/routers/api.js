import VueRouter from 'vue-router';

const HOST = process.env.API_HOST;

export default new VueRouter({
    routes: [
        { path: `${HOST}/calls/`, name: 'calls' },
        { path: `${HOST}/calls/:id`, name: 'call' },
        { path: `${HOST}/users/`, name: 'users' },
        { path: `${HOST}/users/:id`, name: 'user' }
    ]
});
