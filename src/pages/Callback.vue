<template>
    <md-layout>
        <h1>Login Successful, redirecting...</h1>
    </md-layout>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { handleAuthentication } from '../lib/auth';

    export default {
        created() {
            handleAuthentication();
        },
        computed: {
            ...mapGetters({
                authenticated: 'authenticated'
            })
        },
        watch: {
            authenticated(isAuthenticated) {
                console.log('Authentication Successful');
                if (isAuthenticated) {
                    this.$router.push({ name: 'home' });
                }
            }
        }
    };
</script>
