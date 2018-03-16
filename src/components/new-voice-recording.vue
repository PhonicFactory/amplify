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
                <md-dialog-content style="text-align:center;">
                    <audio style="height:48px;" ref="audioInput" controls></audio>
                    <!-- <input type="file" accept="audio/*" capture> -->
                    <md-button class="md-fab" :class="{ 'md-warn': isRecording, 'md-primary': !isRecording }" @click="isRecording=!isRecording">
                        <md-icon>mic</md-icon>
                    </md-button>
                    <p class="md-caption">{{ isRecording ? 'Recording in Progress' : 'Click to Record' }}</p>
                </md-dialog-content>
                <md-dialog-actions>
                    <md-button class="md-primary" :disabled="!base64Audio" @click="sendRecording">Send</md-button>
                    <md-button @click="closeRecording">Cancel</md-button>
                </md-dialog-actions>
            </template>
        </md-dialog>
        <md-button class="md-fab md-fab-bottom-right" :disabled="disabled" @click="startNewCallAudio();$refs.dialog.open()">
            <md-icon>record_voice_over</md-icon>
        </md-button>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import MediaRecording from '../lib/MediaRecording';
    import { blobToBase64 } from '../lib/helpers';

    export default {
        props: {
            disabled: {
                required: false,
                default: false
            }
        },
        data() {
            return {
                loading: false,
                isRecording: false,
                mediaRecording: null,
                base64Audio: ''
            };
        },
        watch: {
            isRecording(bool) {
                if (bool) {
                    this.captureRecording();
                    return;
                }
                this.processRecording();
            },
            status(code) {
                if (code === 'success') {
                    this.closeRecording();
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
                'startNewCallAudio',
                'postCallAudio'
            ]),
            closeRecording() {
                this.$refs.dialog.close();
                this.base64Audio = '';
            },
            sendRecording() {
                const b64_audio = this.base64Audio;
                const {
                    user_id: to_user_id,
                    conversation_phone_number: to_phone_number
                } = this.conversation;
                const {
                    id: from_user_id,
                    phone_number: from_phone_number
                } = this.currentUser;
                this.postCallAudio({
                    to_user_id,
                    to_phone_number,
                    from_user_id,
                    from_phone_number,
                    b64_audio
                });
            },
            captureRecording() {
                console.log('capture recording');
                this.base64Audio = '';
                this.mediaRecording = new MediaRecording();
                this.mediaRecording.complete.then(
                    audioData => {
                        console.log('complete', audioData);
                        this.$refs.audioInput.src = window.URL.createObjectURL(audioData);
                        blobToBase64(audioData)
                            .then((result) => {
                                this.base64Audio = result;
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    },
                    e => {
                        alert('Error Recording Audio!');
                        console.log('Error Recording Audio!', e);
                    }
                );
            },
            processRecording() {
                console.log('process recording');
                this.mediaRecording.stop();
            }
        }
    };
</script>
