<style scoped>
    .home-page {
        position: relative;
        overflow: hidden;
        width: 100%;
    }
</style>
<template>
    <md-layout md-column class="home-page">
        <md-layout md-column>
            <md-toolbar class="md-dense">
                <md-button class="md-icon-button" @click="$refs.leftSidenav.toggle()">
                    <md-icon>account_circle</md-icon>
                </md-button>
                <h2 class="md-title" style="flex: 1">Conversations</h2>
                <md-button class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>
            </md-toolbar>
            <calls @callSelected="$refs.rightSidenav.toggle()"/>
        </md-layout>
        <!-- TODO: Make a vue component for speed dial -->
        
        <md-sidenav class="md-left" ref="leftSidenav">
            <profile />
        </md-sidenav>
        <md-sidenav class="md-right" ref="rightSidenav" @close="clearActiveCall()">
            <active-call />
        </md-sidenav>
        <speed-dial />
    </md-layout>
</template>
<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions([
                'clearActiveCall'
            ])
        }
    };
</script>
