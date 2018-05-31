<style scoped>

</style>
<template>
    <div>
        <md-dialog ref="dialog">
            <template v-if="status === 'pending'">
                <md-dialog-title>Sending message</md-dialog-title>
                <md-dialog-content>
                    <md-layout md-align="center" md-vertical-align="center">
                        <md-spinner md-indeterminate />
                    </md-layout>
                </md-dialog-content>
            </template>
            <template v-else-if="status === 'rejected'">
                <md-dialog-title>Message Failed</md-dialog-title>
                <md-dialog-actions>
                    <md-button @click="closeRecording">Close</md-button>
                </md-dialog-actions>
            </template>
            <template v-else>
                <md-dialog-title>Record new message</md-dialog-title>
                <md-dialog-content>
                    <audio-recorder @changed="base64Audio = arguments[0]"/>
                </md-dialog-content>
                <md-dialog-actions>
                    <md-button class="md-primary" :disabled="!base64Audio" @click="sendRecording">Send</md-button>
                    <md-button @click="closeRecording">Cancel</md-button>
                </md-dialog-actions>
            </template>
        </md-dialog>
        <md-button class="md-fab md-fab-bottom-right" id="fab" @click="startNewMessageAudio();$refs.dialog.open()">
            <md-icon>record_voice_over</md-icon>
        </md-button>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        data() {
            return {
                loading: false,
                base64Audio: ''
            };
        },
        watch: {
            status(code) {
                if (code === 'success') {
                    this.closeRecording();
                    this.$emit('created');
                }
            }
        },
        computed: {
            ...mapGetters({
                'conversation': 'activeConversation',
                'currentUser': 'currentUser',
                'status': 'postMessageStatus'
            })
        },
        methods: {
            ...mapActions([
                'startNewMessageAudio',
                'postMessageAudio'
            ]),
            closeRecording() {
                this.$refs.dialog.close();
                this.base64Audio = '';
            },
            sendRecording() {
                const {
                    id: from_user_id,
                    phone_number: from_phone_number
                } = this.currentUser;
                this.postMessageAudio({
                    b64_audio: this.base64Audio,
                    conversation_id: this.conversation.id,
                    from_user_id,
                    from_phone_number
                });
            }
        }
    };
</script>
