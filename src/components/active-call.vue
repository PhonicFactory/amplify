<template>
    <md-layout md-column>
        <template v-if="activeCall">
            <md-toolbar class="md-toolbar-container md-accent">
                <h3 class="md-title">{{ activeCall.from_number }}</h3>
            </md-toolbar>
            <md-layout>
                <md-icon class="md-primary">phone</md-icon>
                <audio style="height:48px;" controls v-if="activeCall.audio" autoplay="true">
                    <source :src="activeCall.audio" type="audio/wav">
                </audio>
                <span v-else>Loading...</span>
            </md-layout>
        </template>
    </md-layout>
</template>
<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                activeCall: 'activeCall'
            })
        }
    };
</script>
