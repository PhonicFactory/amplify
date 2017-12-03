<template>
    <md-layout :md-column="true">
        <md-toolbar class="md-dense">
            <h2 class="md-title" style="flex: 1">Profile / Settings</h2>
        </md-toolbar>
        <form>
            <md-list>
                <md-list-item>
                    <md-avatar class="md-large">
                        <img src="https://placeimg.com/64/64/people/1" alt="People">
                    </md-avatar>
                </md-list-item>
                <md-list-item v-for="value, field in user" :key="field">
                    <md-input-container>
                        <label>{{ field }}</label>
                        <md-input v-model="user[field]"></md-input>
                    </md-input-container>
                </md-list-item>
            </md-list>
        </form>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                user: {}
            };
        },
        mounted() {
            if (this.authenticated) {
                this.getUsers();
            }
        },
        computed: {
            ...mapGetters({
                authenticated: 'authenticated',
                currentUser: 'currentUser'
            })
        },
        watch: {
            currentUser(user) {
                this.user = user;
            }
        },
        methods: {
            ...mapActions([
                'getUsers'
            ])
        }
    };
</script>
