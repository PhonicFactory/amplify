<template>
    <md-layout>
        <md-layout :md-column="true">
            <md-layout :md-flex="true">
                <component :is="tab" />
            </md-layout>
            <md-bottom-bar md-theme="inverse">
                <md-bottom-bar-item md-icon="forum" :md-active="tab === 'conversations'" @click="$router.push({ name: 'conversations' })">Conversations</md-bottom-bar-item>
                <md-bottom-bar-item md-icon="account_circle" :md-active="tab === 'profile'" @click="$router.push({ name: 'profile' })">Profile</md-bottom-bar-item>
            </md-bottom-bar>
        </md-layout>
    </md-layout>
</template>
<script>
    export default {
        props: {
            tab: {
                required: false,
                type: String
            }
        },
        created() {
            if(!this.tab) {
                this.$router.push({ name: 'conversations' });
            }
        }
    };
</script>
