<style scoped>
    .md-speed-dial {
        margin-bottom: 56px;
    }
</style>
<template>
    <md-layout :md-column="true">
        <md-toolbar class="md-dense">
            <h2 class="md-title" style="flex: 1">Calls</h2>
            <md-button class="md-icon-button">
                <md-icon>search</md-icon>
            </md-button>
        </md-toolbar>
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
                    <md-icon class="md-primary">chat_bubble</md-icon>
                </md-button>
                <md-divider class="md-inset"></md-divider>
            </md-list-item>
            <md-list-item v-if="!calls.length">
                No Calls
            </md-list-item>
        </md-list>
        <md-layout v-if="status === 'pending'" md-align="center" md-vertical-align="center">
            <md-spinner md-indeterminate />
        </md-layout>
        <h2 v-if="status === 'reject'">Error retrieving calls</h2>
        <md-speed-dial md-direction="top" class="md-fab-bottom-right">
            <md-button class="md-fab" md-fab-trigger md-theme="inverse">
                <md-icon md-icon-morph>close</md-icon>
                <md-icon>add</md-icon>
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

    export default {
        mounted() {
            if (this.authenticated) {
                this.getAllCalls();
            }
        },
        computed: {
            ...mapGetters({
                activeCall: 'activeCall',
                calls: 'allCalls',
                status: 'allCallsStatus',
                authenticated: 'authenticated'
            })
        },
        watch: {
            status(value) {
                if (value === 'rejected') {
                    this.$router.push({ name: 'register' });
                }
            }
        },
        methods: {
            ...mapActions([
                'getAllCalls',
                'getCall',
                'clearActiveCall'
            ]),
            openCall(id) {
                this.clearActiveCall();
                this.$refs.callDialog.open();
                this.getCall(id);
            }
        }
    };
</script>
