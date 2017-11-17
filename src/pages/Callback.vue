<template>
    <md-layout>
        <h1>Login Successful, redirecting...</h1>
    </md-layout>
</template>
<script>
    import { handleAuthentication } from '../lib/auth';

    export default {
        created() {
            handleAuthentication();
        }
    };
</script>
