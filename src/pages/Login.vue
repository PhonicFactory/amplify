<template>
    <md-layout>
        <md-layout md-column md-align="center" md-vertical-align="center">
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">
                            Login
                        </div>
                        <div class="md-subhead">for access</div>
                    </md-card-header-text>
                    <md-card-media>
                        <img src="/images/launcher-icon-4x.png" alt="ET">
                    </md-card-media>
                </md-card-header>
                <md-card-actions>
                    <md-input-container :class="{ 'md-input-invalid': invalid }">
                        <template v-if="phoneNumber">
                            <label>Enter Code</label>
                            <md-input v-model="code"></md-input>
                            <md-button @click="validateClicked">Validate</md-button>
                        </template>
                        <template v-else>
                            <label>Enter Phone</label>
                            <md-input ref="phoneNumberInput" v-model="phone_number" pattern="^\+\d{11}$" placeholder="+19998675309" required></md-input>
                            <md-button @click="loginClicked">Log In</md-button>
                        </template>
                    </md-input-container>
                </md-card-actions>
            </md-card>
        </md-layout>
    </md-layout>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { login, validateCode } from '../lib/auth';

    export default {
        data() {
            return {
                invalid: false,
                code: null,
                phone_number: null
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
            loginClicked() {
                if (this.$refs.phoneNumberInput.$el.checkValidity()) {
                    this.invalid = false;
                    login(this.phone_number);
                    return;
                }
                this.invalid = true;
            },
            validateClicked() {
                validateCode(this.code);
            },
            checkForRedirect() {
                if (this.authenticated) {
                    this.$router.replace({ name: 'home' });
                }
            }
        }
    };
</script>
