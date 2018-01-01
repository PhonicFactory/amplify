import VueRouter from 'vue-router';
import config from '../../config';

const HOST = '/auth';

export default new VueRouter({
    routes: [
        { path: `${HOST}/start`, name: 'start' },
        { path: `${HOST}/validate`, name: 'validate' },
    ]
});
