import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';
import Callback from '../pages/Callback.vue';
// import Home from '../pages/Callback.vue';
// import About from '../pages/About.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/calls',
            name: 'calls',
            component: Home,
            props: { tab: 'calls' }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Home,
            props: { tab: 'profile' }
        },
        {
            path: '/callback',
            name: 'auth-callback',
            component: Callback
        }
    ]
});

export default router;
