<template>
    <md-layout :md-column="true">

        <md-toolbar class="md-dense">
            <md-button class="md-icon-button" @click="toggleLeftSidenav">
                <md-icon>account_circle</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">Conversations</h2>
            <md-button class="md-icon-button">
                <md-icon>search</md-icon>
            </md-button>
        </md-toolbar>


        <md-sidenav id="profile" class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
            <md-toolbar class="md-large md-accent">
                <md-avatar class="md-large">
                    <img src="https://placeimg.com/64/64/people/1" alt="People">
                </md-avatar>
                <h2 class="md-title" style="flex: 1">Profile / Settings</h2>
            </md-toolbar>
            <md-layout md-tag="form">
                <md-list>
                    <md-list-item v-for="value, field in user" :key="field">
                        <md-input-container>
                            <label>{{ field }}</label>
                            <md-input v-model="user[field]"></md-input>
                        </md-input-container>
                    </md-list-item>
                    <md-list-item>
                        <md-button md-flex @click="logoutClicked">Log Out</md-button>
                    </md-list-item>
                    <md-list-item>
                        <md-button md-flex class="md-warn" @click="deleteClicked">Delete Account</md-button>
                    </md-list-item>
                </md-list>
            </md-layout>
        </md-sidenav>


        <md-list v-if="status === 'success'">
            
            <md-dialog ref="callDialog">
                <md-dialog-content>
                    <audio controls v-if="activeCall">
                        <source :src="activeCall" type="audio/wav">
                    </audio>
                    <span v-else>Loading...</span>
                </md-dialog-content>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="$refs.callDialog.close()">Close</md-button>
                </md-dialog-actions>
            </md-dialog>

            <md-list-item v-for="call in calls" :key="call.id">
                <md-icon class="md-primary">person_add</md-icon>
                <div class="md-list-text-container">
                    <span>{{ call.from_number }}</span>
                    <span>at {{ call.created_at }}</span>
                </div>
                <md-button class="md-icon-button md-list-action" @click="openCall(call.id)">
                    <md-icon class="md-primary">hearing</md-icon>
                </md-button>
                <md-divider class="md-inset"></md-divider>
            </md-list-item>
            <md-list-item v-if="!calls.length">
                No Calls
            </md-list-item>
        </md-list>

        <md-sidenav id="callbox" class="md-right" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
            <md-toolbar class="md-toolbar-container md-accent">
                <h3 class="md-title">Insert # Here</h3>
            </md-toolbar>
            <md-layout>
                <md-icon class="md-primary">phone</md-icon>
                <audio controls v-if="activeCall" autoplay="true">
                    <source :src="activeCall" type="audio/wav">
                </audio>
            </md-layout>
        </md-sidenav>
        
        <md-layout v-if="status === 'pending'" md-align="center" md-vertical-align="center">
            <md-spinner md-indeterminate />
        </md-layout>
        <h2 v-if="status === 'reject'">Error retrieving calls</h2>
        <md-speed-dial md-direction="top" class="md-fab-bottom-right">
            <md-button class="md-fab" md-fab-trigger md-theme="inverse">
                <md-icon md-icon-morph>close</md-icon>
                <md-icon>record_voice_over</md-icon>
            </md-button>
            <md-button class="md-fab md-primary md-mini md-clean">
                <md-icon>call</md-icon>
            </md-button>
            <md-button class="md-fab md-primary md-mini md-clean">
                <md-icon>message</md-icon>
            </md-button>
        </md-speed-dial>
    </md-layout>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { logout } from '../lib/auth';

    export default {
        data() {
            return {
                user: {}
            };
        },

        mounted() {
            if (this.authenticated) {
                this.getAllCalls();
                this.getUsers();
            }
        },

        computed: {
            ...mapGetters({
                activeCall: 'activeCall',
                calls: 'allCalls',
                status: 'allCallsStatus',
                authenticated: 'authenticated',
                currentUser: 'currentUser',
                deleteUserStatus: 'deleteUserStatus'
            })
        },

        watch: {
            status(value) {
                if (value === 'rejected') {
                    this.$router.push({ name: 'register' });
                }
            },
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
            }
        },

        methods: {
            ...mapActions([
                'getAllCalls',
                'getCall',
                'clearActiveCall',
                'getUsers',
                'deleteUser'
            ]),
            openCall(id) {
                this.clearActiveCall();
                this.$refs.rightSidenav.toggle();
                this.getCall(id);
            },

            toggleRightSidenav() {
                this.$refs.rightSidenav.toggle();
            },
            closeRightSidenav() {
                this.$refs.rightSidenav.close();
            },

            toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle();
            },
            open(ref) {
                console.log('Opened: ' + ref);
            },
            close(ref) {
                console.log('Closed: ' + ref);
            },

            logoutClicked: logout,
            deleteClicked() {
                if (window.confirm('Are you sure you want to delete your account?')) {
                    this.deleteUser(this.user.id);
                }
            }
        }
    };
</script>
