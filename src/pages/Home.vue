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
        <md-speed-dial md-direction="top" class="md-fab-bottom-right">
            <md-button class="md-fab" md-fab-trigger md-theme="inverse">
                <md-icon md-icon-morph>close</md-icon>
                <md-icon>record_voice_over</md-icon>
            </md-button>
            <md-button class="md-fab md-primary md-mini md-clean">
                <md-icon>call</md-icon>
            </md-button>
            <md-button class="md-fab md-primary md-mini md-clean">
                <md-icon>message</md-icon>
            </md-button>
        </md-speed-dial>
        <md-sidenav class="md-left" ref="leftSidenav">
            <profile />
        </md-sidenav>
        <md-sidenav class="md-right" ref="rightSidenav" @close="clearActiveCall()">
            <active-call />
        </md-sidenav>
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
