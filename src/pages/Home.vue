<template>
    <md-layout>
        <md-layout md-column>
            <md-layout md-column style="max-height: 50px;">
                  <md-button md-flex v-if="!authenticated" @click="loginClicked">Log In</md-button>
                  <md-button md-flex v-if="authenticated" @click="logoutClicked">Log Out</md-button>
            </md-layout>
            <md-layout md-flex>
                <component :is="tab" />
            </md-layout>
            <md-bottom-bar md-theme="inverse">
                <md-bottom-bar-item md-icon="forum" :md-active="tab === 'conversations'" @click="$router.push({ name: 'conversations' })">Conversations</md-bottom-bar-item>
                <md-bottom-bar-item md-icon="account_circle" :md-active="tab === 'profile'" @click="$router.push({ name: 'profile' })">Profile</md-bottom-bar-item>
            </md-bottom-bar>
        </md-layout>
    </md-layout>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { login, logout } from '../lib/auth';

    export default {
        props: {
            tab: {
                required: false,
                type: String
            }
        },
        computed: {
            ...mapGetters({
                authenticated: 'authenticated'
            })
        },
        created() {
            if(!this.tab) {
                this.$router.push({ name: 'conversations' });
            }
        },
        methods: {
            loginClicked: login,
            logoutClicked: logout,
        }
    };
</script>
