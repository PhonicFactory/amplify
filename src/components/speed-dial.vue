<template>
    <md-layout :md-column="true">
        <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog">
        <md-dialog-title>Record new message</md-dialog-title>

        <md-dialog-content>
            <md-button class="md-fab md-primary">
                <md-icon>mic</md-icon>
            </md-button>
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog('dialog')">Send</md-button>
        </md-dialog-actions>
        </md-dialog>

        <md-button class="md-fab md-fab-bottom-right" id="fab" @click="openDialog('dialog')">
            <md-icon>record_voice_over</md-icon>
        </md-button>
    </md-layout>
</template>
<script>
    export default {
    methods: {
        openDialog(ref) {
        this.$refs[ref].open();
        },
        closeDialog(ref) {
        this.$refs[ref].close();
        },
        onOpen() {
        console.log('Opened');
        },
        onClose(type) {
        console.log('Closed', type);
        }
    }
    };
</script>
    