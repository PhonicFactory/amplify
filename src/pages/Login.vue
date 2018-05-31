<style lang="scss"></style>
<template>
    <md-layout md-column class="auth-page">
        <md-toolbar class="md-dense">
            <md-button class="md-icon-button">
                <md-icon md-src="/images/launcher-icon.png" />
            </md-button>
            <h2 class="md-title">Amplify</h2>
        </md-toolbar>
        <md-layout>
            <md-boards class="md-boards-simple" ref="boards">
                <md-board class="flex-columns">
                    <phone-input @changed="phone_number = arguments[0]"/>
                    <h5 class="mt-md text-center">We'll send a text to verify your phone</h5>
                    <md-button class="mt-md md-raised md-primary" :disabled="loading || !phone_number" @click="sendCodeClicked">Send Code</md-button>
                </md-board>
                <md-board class="flex-columns">
                    <md-input-container :class="{ 'md-input-invalid': codeInvalid }" style="margin-bottom: 0;">
                        <md-input v-model="code" placeholder="000000" maxlength="6" required></md-input>
                    </md-input-container>
                    <h5 class="mt-md text-center">{{`Enter the 6-digit code sent to ${phone_number}`}}</h5>
                    <md-button class="mt-md md-raised md-primary" :disabled="loading" @click="validateClicked">Validate</md-button>
                    <md-button :disabled="loading" @click="$refs.boards.movePrevBoard()">Re-send Code</md-button>
                </md-board>
            </md-boards>
        </md-layout>
    </md-layout>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { login, validateCode } from '../lib/auth';

    export default {
        data() {
            return {
                codeInvalid: false,
                code: null,
                phone_number: false,
                loading: false
            };
        },
        created() {
            this.checkForRedirect();
        },
        computed: {
            ...mapGetters({
                authenticated: 'authenticated'
            })
        },
        watch: {
            authenticated() {
                console.log('Authentication Successful');
                this.checkForRedirect();
            }
        },
        methods: {
            sendCodeClicked() {
                this.loading = true;
                login(this.phone_number)
                    .then(() => {
                        this.$refs.boards.moveNextBoard();
                        this.loading = false;
                    })
                    .catch((e) => {
                        this.loading = false;
                        alert('Error sending code.  Please try again.')
                        console.log('Error sending code');
                    });
            },
            validateClicked() {
                this.loading = true;
                validateCode(this.code)
                    .then(() => {
                        this.codeInvalid = false;
                    })
                    .catch(() => {
                        this.codeInvalid = true;
                        this.loading = false;
                    });
            },
            checkForRedirect() {
                if (this.authenticated) {
                    this.$router.replace({ name: 'home' });
                }
            }
        }
    };
</script>
