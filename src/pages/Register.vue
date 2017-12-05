<template>
    <md-layout :md-column="true">
        <md-toolbar class="md-dense">
            <h2 class="md-title" style="flex: 1">Profile / Settings</h2>
        </md-toolbar>
        <form @submit.prevent="submit">
            <md-list>
                <md-list-item>
                    <md-input-container>
                        <label>Email</label>
                        <md-input v-model="email"></md-input>
                    </md-input-container>
                </md-list-item>
                <md-list-item>
                    <md-input-container>
                        <label>First Name</label>
                        <md-input v-model="first_name"></md-input>
                    </md-input-container>
                </md-list-item>
                <md-list-item>
                    <md-input-container>
                        <label>Last Name</label>
                        <md-input v-model="last_name"></md-input>
                    </md-input-container>
                </md-list-item>
                <md-list-item>
                    <md-input-container>
                        <label>Phone</label>
                        <md-input v-model="phone_number" placeholder="+19739416607"></md-input>
                    </md-input-container>
                </md-list-item>
                <md-button type="submit">Submit</md-button>
            </md-list>
        </form>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                email: null,
                first_name: null,
                last_name: null,
                phone_number: null
            };
        },
        methods: {
            ...mapActions([
                'createUser'
            ]),
            submit() {
                this.createUser({
                    email: this.email,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    phone_number: this.phone_number
                });
            }
        }
    };
</script>
