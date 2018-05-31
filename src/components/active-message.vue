<template>
    <md-layout md-column>
        <template v-if="message">
            <audio style="height:48px;" controls v-if="message.audio" autoplay="true">
                <source :src="message.audio" type="audio/wav">
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
                message: 'activeMessage'
            })
        }
    };
</script>
