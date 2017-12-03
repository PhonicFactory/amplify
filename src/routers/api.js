import VueRouter from 'vue-router';

// TODO: Configure this in .env file
const HOST = 'http://ec2-52-15-174-193.us-east-2.compute.amazonaws.com/api';

export default new VueRouter({
    routes: [
        { path: `${HOST}/calls/`, name: 'calls' },
        { path: `${HOST}/calls/:id`, name: 'call' },
        { path: `${HOST}/users/`, name: 'users' },
        { path: `${HOST}/users/:id`, name: 'user' }
    ]
});
