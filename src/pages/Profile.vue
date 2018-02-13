<template>
    <md-layout md-column>
        <md-toolbar class="md-dense">
            <md-button class="md-icon-button" @click="$router.push({ name: 'conversations' })">
                <md-icon>arrow_back</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">Profile / Settings</h2>
            <md-button class="md-icon-button">
                <md-icon>mode_edit</md-icon>
            </md-button>
        </md-toolbar>
        <md-layout md-tag="form">
            <md-list>
                <md-list-item>
                    <md-input-container>
                        <label>Phone #</label>
                        <md-input disabled v-model="user.phone_number"></md-input>
                    </md-input-container>
                </md-list-item>
                <md-list-item>
                    <md-switch class="md-primary" :disabled="loading" v-model="hasPushSubscription">Allow notifications</md-switch>
                </md-list-item>
                <md-list-item>
                    <md-button md-flex @click="logoutClicked">Log Out</md-button>
                </md-list-item>
                <md-list-item>
                    <md-button md-flex class="md-warn" @click="deleteClicked">Delete Account</md-button>
                </md-list-item>
            </md-list>
        </md-layout>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { logout } from '../lib/auth';
    import { subscribe, unsubscribe } from '../lib/push-notifications';

    export default {
        data() {
            return {
                user: {},
                notificationsEnabled: false,
                loading: false
            };
        },
        computed: {
            ...mapGetters({
                authenticated: 'authenticated',
                currentUser: 'currentUser',
                deleteUserStatus: 'deleteUserStatus',
                pushSubscription: 'clientPushSubscription',
                serverPushSubscriptionId: 'serverPushSubscriptionId'
            }),
            hasPushSubscription: {
                get() {
                    return !!this.pushSubscription;
                },
                set(value) {
                    this.loading = true;
                    if (value) {
                        subscribe();
                        return;
                    }
                    unsubscribe();
                }
            }
        },
        watch: {
            currentUser(user) {
                this.user = user;
            },
            deleteUserStatus(status) {
                switch (status) {
                    case 'success':
                        logout();
                        break;
                    default:
                }
            },
            serverPushSubscriptionId() {
                this.loading = false;
            }
        },
        methods: {
            ...mapActions([
                'deleteUser'
            ]),
            logoutClicked: logout,
            deleteClicked() {
                if (window.confirm('Are you sure you want to delete your account?')) {
                    this.deleteUser(this.user.id);
                }
            }
        }
    };
</script>
