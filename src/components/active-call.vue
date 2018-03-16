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

    /* TODO: Clean this up and change variable names from 'call(s)' to 'message(s)' */
    export default {
        props: ['activeMessage'],
        data() {
            return {
                message: {}
            };
        },
        created() {
            if (this.activeMessage) {

            }
        },
        computed: {
            ...mapGetters({
                activeCall: 'activeCall'
            })
        },
        watch: {
            activeCall(message) {
                this.message = message;
            },
            activeMessage(message) {
                this.message = message;
            }
        }
    };
</script>
