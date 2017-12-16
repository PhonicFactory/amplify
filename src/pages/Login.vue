<template>
    <md-layout>
        <md-layout md-column md-align="center" md-vertical-align="center">
            <h1 class="md-display-2">Welcome, please log in</h1>
            <md-button @click="loginClicked">Log In</md-button>
        </md-layout>
    </md-layout>
</template>
<script>
    import { login } from '../lib/auth';

    export default {
        methods: {
            loginClicked: login
        }
    };
</script>
