<template>
    <md-list-item :disabled="disabled" @click="$emit('selected')">
        <md-icon class="md-primary">face</md-icon>
        <div class="md-list-text-container">
            <span>{{ conversation.conversation_phone_number }}</span>
            <span>at {{ conversation.created_at }}</span>
        </div>
        <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">keyboard_arrow_right</md-icon>
        </md-button>
        <md-divider class="md-inset"></md-divider>
    </md-list-item>
</template>
<script>
    export default {
        props: {
            conversation: {
                required: true
            },
            disabled: {
                required: false,
                default: false
            }
        }
    }
</script>
