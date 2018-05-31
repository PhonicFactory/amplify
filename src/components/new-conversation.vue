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
                <!-- <md-board>
                    <audio-recorder @changed="base64Audio = arguments[0]"/>
                    <md-button class="mt-md md-raised md-primary" :disabled="!base64Audio" @click="moveNextBoard">Next</md-button>
                </md-board> -->
                <md-board>
                    <phone-input @changed="phone_number = arguments[0]"/>
                    <md-button class="mt-md md-raised md-primary" :disabled="!phone_number" @click="phoneNumberSubmitted">Create</md-button>
                </md-board>
                <!-- <md-board>
                    <md-icon class="md-accent">done</md-icon> Message Sent!
                </md-board> -->
            </md-boards>
        </md-dialog>
        <md-button class="md-fab md-fab-bottom-right" id="fab" @click="dialogOpen=true">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        data() {
            return {
                base64Audio: '',
                phone_number: false,
                dialogOpen: false
            };
        },
        watch: {
            dialogOpen() {
                this.$refs.dialog.open();
            },
            status(code) {
                if (code === 'success') {
                    this.$router.push({ name: 'conversation', params: { convoId: this.conversation.id } })
                }
            }
        },
        computed: {
            ...mapGetters({
                user: 'currentUser',
                status: 'activeConversationStatus',
                conversation: 'activeConversation'
            })
        },
        methods: {
            ...mapActions([
                'createConversation'
            ]),
            moveNextBoard() {
                this.$refs.boards.moveNextBoard();
            },
            phoneNumberSubmitted() {
                this.createConversation({
                    participants: [this.user.phone_number, this.phone_number]
                });
            }
        }
    };
</script>
