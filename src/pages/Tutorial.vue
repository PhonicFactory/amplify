<style>
    .tutorial .md-boards-navigation {
        display: none;
    }
    .tutorial .md-boards .md-board {
        padding: 0;
    }
    .tutorial .md-fab-bottom-right {
        bottom: 72px;
    }
</style>
<template>
    <md-layout class="tutorial">
        <md-boards ref="boards">
            <md-board>
                <md-toolbar class="md-dense">
                    <h2 class="md-title">Profile</h2>
                </md-toolbar>
                <md-card>
                    <md-card-header>
                        <md-card-media>
                            <md-button class="md-fab md-icon-button">
                                <md-icon>mic</md-icon>
                            </md-button>
                        </md-card-media>
                        <md-card-header-text>
                            <md-input-container>
                                <label>First Name</label>
                                <md-input v-model="user.first_name"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Last Name</label>
                                <md-input v-model="user.last_name"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Email</label>
                                <md-input v-model="user.email"></md-input>
                            </md-input-container>
                        </md-card-header-text>
                    </md-card-header>
                    <md-card-actions>
                        <md-button class="md-raised md-primary" @click="goNext()">Next</md-button>
                    </md-card-actions>
                </md-card>
            </md-board>
            <md-board>
                <md-toolbar class="md-dense">
                    <h2 class="md-title">Conversations</h2>
                </md-toolbar>
                <md-list>
                    <conversation-item :conversation="convo" @selected="goNext" />
                </md-list>
            </md-board>
            <md-board>
                <md-toolbar class="md-dense">
                    <h2 class="md-title">Bob The Beluga</h2>
                </md-toolbar>
                <md-list>
                    <message-item :message="message" @selected="messageSelected" />
                </md-list>
            </md-board>
            <md-board>
                <md-toolbar class="md-dense">
                    <h2 class="md-title">Conversations</h2>
                </md-toolbar>
                <md-list>
                    <conversation-item :conversation="convo" :disabled="true" />
                </md-list>
            </md-board>
        </md-boards>
        <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="Infinity">
            <template v-if="isStep(1)">
                <span>Add your name &amp; a greeting so friends can find you.</span>
            </template>
            <template v-else-if="isStep(2)">
                Click the convo above to meet Bob, our whale friend!
            </template>
            <template v-else-if="isStep(3)">
                Click the message to hear audio.
            </template>
            <template v-else>
                Click the + button to create a message for a friend.
            </template>
        </md-snackbar>
        <md-dialog ref="activeCallDialog" :md-click-outside-to-close="false">
            <md-dialog-content>
                <active-call :activeMessage="activeMessage"/>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="$refs.activeCallDialog.close();goNext();">Done</md-button>
            </md-dialog-actions>
        </md-dialog>
        <new-voice-recording v-if="!isStep(1)" :disabled="isStep([2,3])"/>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    const created_at = (new Date()).toISOString();

    export default {
        data() {
            return {
                user: {},
                convo: {
                    conversation_phone_number: '+12128675309',
                    created_at
                },
                message: {
                    id: -1,
                    created_at,
                    audio: 'http://www.pacdv.com/sounds/voices/hello-2.wav'
                },
                activeMessage: null,
                step: 1
            };
        },
        computed: {
            ...mapGetters({
                currentUser: 'currentUser'
            })
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.snackbar.open();
            });
        },
        watch: {
            currentUser(user) {
                this.user = user;
            }
        },
        methods: {
            goNext() {
                this.step++;
                this.$refs.boards.moveNextBoard();
            },
            isStep(steps) {
                if (typeof steps === 'number') {
                    return this.step === steps;
                }
                return steps.indexOf(this.step) > -1;
            },
            messageSelected() {
                this.$refs.activeCallDialog.open();
                this.activeMessage = this.message;
            }
        }
    };
</script>
