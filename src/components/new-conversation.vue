<style lang="scss">
    .new-conversation {
        .md-dialog{
            min-height: 200px;
        }
    }
</style>
<template>
    <div class="new-conversation">
        <md-dialog ref="dialog">
            <md-boards v-if="dialogOpen" class="md-boards-simple" ref="boards">
                <md-board>
                    <audio-recorder @changed="audioRecordingChanged"/>
                    <md-button class="mt-md md-raised md-primary" :disabled="!audioRecording" @click="moveNextBoard">Next</md-button>
                </md-board>
                <md-board>
                    <phone-input @changed="phoneNumberChanged"/>
                    <md-button class="mt-md md-raised md-primary" :disabled="!phoneNumber" @click="createConversation">Send</md-button>
                </md-board>
                <md-board>
                    <md-icon class="md-accent">done</md-icon> Message Sent!
                </md-board>
            </md-boards>
        </md-dialog>
        <md-button class="md-fab md-fab-bottom-right" id="fab" @click="dialogOpen=true">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>
<script>
    // import { mapActions, mapGetters } from 'vuex';

    export default {
        data() {
            return {
                audioRecording: false,
                phoneNumber: false,
                dialogOpen: false
            };
        },
        watch: {
            dialogOpen() {
                this.$refs.dialog.open();
            }
        },
        methods: {
            audioRecordingChanged(recording) {
                this.audioRecording = recording;
            },
            phoneNumberChanged(value) {
                this.phoneNumber = value;
            },
            moveNextBoard() {
                this.$refs.boards.moveNextBoard();
            },
            createConversation() {
                this.moveNextBoard();
                setTimeout(() => {
                    alert('Coming Soon!');
                }, 500);
            }
        }
    };
</script>
