<template>
    <md-layout md-column>
        <md-toolbar class="md-dense">
            <md-button class="md-icon-button" @click="$router.push({ name: 'conversations' })">
                <md-icon>arrow_back</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">
                {{ conversation && conversationLabel(conversation.participants, currentUser.id) }}
            </h2>
        </md-toolbar>
        <md-layout md-column>
            <md-list v-if="status === 'success'">
                <md-list-item v-for="message in messages" :key="message.id">
                    <md-icon class="md-primary">call</md-icon>
                    <div class="md-list-text-container">
                        <span>{{ createdAt(message) }}</span>
                    </div>
                    <md-button class="md-icon-button md-list-action" @click="$router.push({ name: 'message', params: { convoId, messageId: message.id } })">
                        <md-icon class="md-primary">hearing</md-icon>
                    </md-button>
                    <md-divider class="md-inset"></md-divider>
                </md-list-item>
                <md-list-item v-if="!messages.length">
                    No Messages
                </md-list-item>
            </md-list>
            <md-layout v-if="status === 'pending'" md-align="center" md-vertical-align="center">
                <md-spinner md-indeterminate />
            </md-layout>
            <h2 v-if="status === 'reject'">Error retrieving messages</h2>
        </md-layout>
        <md-dialog ref="activeMessageDialog">
            <md-dialog-content>
                <audio-player :src="activeMessage ? activeMessage.audio : null"/>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="closeMessage()">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
        <new-message @created="getAllMessages(convoId)"/>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import moment from 'moment';
    import { conversationLabel } from '../lib/helpers';

    export default {
        props: ['convoId', 'messageId'],
        created() {
            this.clearAllMessages();
            if (!this.conversation) {
                this.fetchActiveConversation(this.convoId);
            }
        },
        mounted() {
            this.getAllMessages(this.convoId);
            if (this.messageId) {
                this.$nextTick(()=> {
                    this.openMessage({ id: this.messageId });
                });
            }
        },
        computed: {
            ...mapGetters({
                activeMessage: 'activeMessage',
                messages: 'allMessages',
                status: 'allMessagesStatus',
                conversation: 'activeConversation',
                currentUser: 'currentUser'
            })
        },
        watch: {
            '$route.params.messageId'(id) {
                if (!id) {
                    this.$refs.activeMessageDialog.close();
                    return;
                }
                this.openMessage({ id })
            }
        },
        methods: {
            ...mapActions([
                'clearAllMessages',
                'fetchActiveConversation',
                'getAllMessages',
                'getMessageAudio'
            ]),
            conversationLabel: conversationLabel,
            openMessage(message) {
                this.$refs.activeMessageDialog.open();
                this.getMessageAudio(message);
            },
            closeMessage() {
                this.$router.push({ name: 'conversation', params: { convoId: this.convoId } });
            },
            createdAt({ created_at }) {
                return moment(created_at).format('MMM D, h:mm A');
            }
        }
    };
</script>
