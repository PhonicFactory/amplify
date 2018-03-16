<template>
    <md-list-item>
        <md-icon class="md-primary">call</md-icon>
        <div class="md-list-text-container">
            <span>{{ message.created_at }}</span>
        </div>
        <md-button class="md-icon-button md-list-action" @click="messageClicked">
            <md-icon class="md-primary">hearing</md-icon>
        </md-button>
        <md-divider class="md-inset"></md-divider>
    </md-list-item>
</template>
<script>
    export default {
        props: ['message', 'convoId'],
        methods: {
            messageClicked() {
                const { convoId, message } = this;
                const { id: callId } = message;
                if (!convoId) {
                    this.$emit('selected');
                    return;
                }
                this.$router.push({
                    name: 'call',
                    params: { convoId, callId }
                });
            }
        }
    }
</script>
