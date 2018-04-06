<style lang="scss">
    @import "../styles/variables";

    $input-height: 48px;

    .auth-page {

        .md-boards-navigation {
            display: none;
        }

        .md-count {
            display: none;
        }
    }

    .input-tel {
        border-radius: $gutter-sm;
        border: solid 1px #ccc;
        min-height: $input-height;
        line-height: $input-height;

        &,
        .input-tel-select,
        .input-tel-prefix {
            flex: 0;
        }

        &.input-invalid {
            border-color: $red;
        }

        .input-tel-select {
            border-right: solid 1px #ccc;
        }

        .input-tel-input {
            flex: 1;
        }

        .md-input-container {
            padding: 0;
            margin: 0;

            &:after {
                display: none;
            }
        }
    }
</style>
<template>
    <md-layout md-column class="auth-page">
        <md-toolbar class="md-dense">
            <md-button class="md-icon-button">
                <md-icon md-src="/images/launcher-icon.png" />
            </md-button>
            <h2 class="md-title">Amplify</h2>
        </md-toolbar>
        <md-layout>
            <md-boards ref="boards">
                <md-board class="flex-columns">
                    <md-layout class="input-tel" :class="{ 'input-invalid': phoneInvalid }">
                        <div class="input-tel-select pl-sm pr-sm">
                            <md-icon md-src="/images/flag-us.png" />
                        </div>
                        <div class="input-tel-prefix pl-sm pr-sm">+1</div>
                        <div class="input-tel-input">
                            <md-input-container :class="{ 'md-input-invalid': phoneInvalid }">
                                <md-input md-clearable ref="phoneNumberInput" class="mt-sm" v-model="phone_number" maxlength="10" pattern="^\d{10}$" placeholder="8888675309" required></md-input>
                            </md-input-container>
                        </div>
                    </md-layout>
                    <h5 class="mt-md text-center">We'll send a text to verify your phone</h5>
                    <md-button class="mt-md md-raised md-primary" :disabled="loading" @click="sendCodeClicked">Send Code</md-button>
                </md-board>
                <md-board class="flex-columns">
                    <md-input-container :class="{ 'md-input-invalid': codeInvalid }" style="margin-bottom: 0;">
                        <md-input v-model="code" placeholder="000000" maxlength="6" required></md-input>
                    </md-input-container>
                    <h5 class="mt-md text-center">{{`Enter the 6-digit code sent to +1${phone_number}`}}</h5>
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
                phoneInvalid: false,
                codeInvalid: false,
                code: null,
                phone_number: null,
                loading: false
            };
        },
        created() {
            this.checkForRedirect();
        },
        computed: {
            ...mapGetters({
                phoneNumber: 'authPhoneNumber',
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
                if (this.$refs.phoneNumberInput.$el.checkValidity()) {
                    this.phoneInvalid = false;
                    login(`+1${this.phone_number}`)
                        .then(() => {
                            this.$refs.boards.moveNextBoard();
                            this.loading = false;
                        });
                    return;
                }
                this.phoneInvalid = true;
                this.loading = false;
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
