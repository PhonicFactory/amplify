import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthenticated } from '../lib/auth';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Profile from '../pages/Profile.vue';
import Conversations from '../pages/Conversations.vue';
import Conversation from '../pages/Conversation.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/conversations',
            name: 'conversations',
            component: Conversations,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/conversation/:convoId',
            name: 'conversation',
            components: { default: Conversation },
            meta: {
                requiresAuth: true
            },
            props: { default: true }
        },
        {
            path: '/conversation/:convoId/message/:messageId',
            name: 'message',
            components: { default: Conversation },
            meta: {
                requiresAuth: true
            },
            props: { default: true }
        }
    ]
});

/**
 * Provide navigation guard for authenticated routes
 * @param  {Function} (to, from, next)
 * @return {void}
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log('authenticated route');
        isAuthenticated()
            .then(() => {
                console.log('authenticated', to);
                next();
            })
            .catch(() => {
                console.log('not authenticated', to);
                next({ name: 'login' });
            });
        return;
    }
    console.log('unauthenticated route');
    next();
});

export default router;
