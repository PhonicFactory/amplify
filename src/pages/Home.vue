<template>
    <md-layout md-column></md-layout>
</template>
<script>
    export default {
        created() {
            // Simply redirect to conversations for now
            this.$router.replace({ name: 'conversations' });
        }
    };
</script>
