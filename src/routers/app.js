import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';
// import About from '../pages/About.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/conversations',
            name: 'conversations',
            component: Home,
            props: { tab: 'conversations' }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Home,
            props: { tab: 'profile' }
        }
    ]
});

export default router;
