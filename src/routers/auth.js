import VueRouter from 'vue-router';
import config from '../../config';

// const HOST = config.apiHost;
// const HOST = 'https://eartickling.auth0.com';
const HOST = '/auth';

export default new VueRouter({
    routes: [
        { path: `${HOST}/start`, name: 'start' },
        { path: `${HOST}/validate`, name: 'validate' },
    ]
});
