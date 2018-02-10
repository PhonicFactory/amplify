<template>
    <md-layout md-column>
        <template v-if="activeCall">
            <audio style="height:48px;" controls v-if="activeCall.audio" autoplay="true">
                <source :src="activeCall.audio" type="audio/wav">
            </audio>
            <span v-else>Loading...</span>
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
