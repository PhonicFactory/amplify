<style lang="scss">
    .audio-recorder{
        align-items: center;
    }
</style>
<template>
    <md-layout class="audio-recorder" md-column md-align="center">
        <audio-player v-show="base64Audio" :src="base64Audio"/>
        <!-- <input type="file" accept="audio/*" capture> -->
        <md-button
            class="md-fab"
            :class="{ 'md-warn': isRecording, 'md-primary': !isRecording }"
            @click="isRecording=!isRecording"
        >
            <md-icon>mic</md-icon>
        </md-button>
        <p class="md-caption">{{ isRecording ? 'Recording in Progress' : 'Click to Record' }}</p>
    </md-layout>
</template>
<script>
    import MediaRecording from '../lib/MediaRecording';
    import { blobToBase64 } from '../lib/helpers';

    export default {
        data() {
            return {
                isRecording: false,
                mediaRecording: null,
                base64Audio: ''
            };
        },
        beforeDestroy() {
            this.base64Audio = '';
        },
        watch: {
            isRecording(bool) {
                if (bool) {
                    this.captureRecording();
                    return;
                }
                this.processRecording();
            },
            base64Audio(value) {
                this.$emit('changed', value);
            }
        },
        methods: {
            captureRecording() {
                console.log('capture recording');
                this.$emit('recording');
                this.base64Audio = '';
                this.mediaRecording = new MediaRecording();
                this.mediaRecording.complete.then(
                    audioData => {
                        console.log('complete', audioData);
                        blobToBase64(audioData)
                            .then((result) => {
                                this.base64Audio = result;
                            })
                            .catch((e) => {
                                console.log(e);
                            });
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
