<style scoped>
    .md-bottom-bar {
        z-index: 10;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .page-container {
        padding-bottom: 56px; // TODO: Set up scss
    }
</style>
<template>
    <md-layout>
        <md-layout md-column>
            <md-layout md-flex class="page-container">
                <component :is="tab" />
            </md-layout>
        </md-layout>
    </md-layout>
</template>
<script>
    import { mapGetters } from 'vuex';

    export default {
        props: {
            tab: {
                required: false,
                type: String
            }
        },
        created() {
            if(!this.tab) {
                this.$router.push({ name: 'calls' });
            }
        }
    };
</script>
