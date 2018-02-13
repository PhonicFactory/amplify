<template>
    <md-layout md-column>
        <md-toolbar class="md-dense">
            <md-button class="md-icon-button" @click="$router.push({ name: 'conversations' })">
                <md-icon>arrow_back</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">{{ conversation && conversation.conversation_phone_number }}</h2>
        </md-toolbar>
        <md-layout md-column>
            <md-list v-if="status === 'success'">
                <md-list-item v-for="call in calls" :key="call.id">
                    <md-icon class="md-primary">call</md-icon>
                    <div class="md-list-text-container">
                        <span>{{ call.created_at }}</span>
                    </div>
                    <md-button class="md-icon-button md-list-action" @click="openCall(call)">
                        <md-icon class="md-primary">hearing</md-icon>
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
        </md-layout>
        <md-dialog ref="activeCallDialog">
            <md-dialog-content>
                <active-call />
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="$refs.activeCallDialog.close()">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        props: ['id'],
        created() {
            this.clearAllCalls();
            if (!this.conversation) {
                this.fetchActiveConversation(this.id);
            }
        },
        mounted() {
            this.getAllCalls(this.id);
        },
        computed: {
            ...mapGetters({
                calls: 'allCalls',
                status: 'allCallsStatus',
                conversation: 'activeConversation'
            })
        },
        methods: {
            ...mapActions([
                'clearAllCalls',
                'fetchActiveConversation',
                'getAllCalls',
                'getCallAudio'
            ]),
            openCall(call) {
                this.$refs.activeCallDialog.open();
                this.getCallAudio(call);
            }
        }
    };
</script>
