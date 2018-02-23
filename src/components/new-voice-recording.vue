<style scoped>

</style>
<template>
    <div>
        <md-dialog ref="dialog">
            <md-dialog-title>Record new message</md-dialog-title>
            <md-dialog-content style="text-align:center;">
                <audio style="height:48px;" ref="audioInput" controls></audio>
                <!-- <input type="file" accept="audio/*" capture> -->
                <md-button :disabled="loading" class="md-fab" :class="{ 'md-warn': isRecording, 'md-primary': !isRecording }" @click="isRecording=!isRecording">
                    <md-icon>mic</md-icon>
                </md-button>
                <p class="md-caption">{{ isRecording ? 'Recording in Progress' : 'Click to Record' }}</p>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="sendRecording">Send</md-button>
                <md-button @click="cancelRecording">Cancel</md-button>
            </md-dialog-actions>
        </md-dialog>
        <md-button class="md-fab md-fab-bottom-right" id="fab" @click="$refs.dialog.open()">
            <md-icon>record_voice_over</md-icon>
        </md-button>
    </div>
</template>
<script>
    import MediaRecording from '../lib/MediaRecording';

    export default {
        data() {
            return {
                loading: false,
                isRecording: false,
                mediaRecording: null
            };
        },
        watch: {
            isRecording(bool) {
                if (bool) {
                    this.captureRecording();
                    return;
                }
                this.processRecording();
            }
        },
        methods: {
            cancelRecording() {
                this.$refs.dialog.close();
            },
            sendRecording() {
                this.loading = true;
            },
            captureRecording() {
                console.log('capture recording');
                this.mediaRecording = new MediaRecording();
                this.mediaRecording.complete.then(
                    audioData => {
                        console.log('complete', audioData);
                        this.$refs.audioInput.src = window.URL.createObjectURL(audioData);
                    },
                    e => {
                        alert('Error Recording Audio!');
                        console.log('Error Recording Audio!', e);
                    }
                );
            },
            processRecording() {
                console.log('process recording');
                this.mediaRecording.stop();
            }
        }
    };
</script>
