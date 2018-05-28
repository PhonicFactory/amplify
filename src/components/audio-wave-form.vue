<template>
    <div class="audio-wave-form">
        <!-- <input type="file" @change="change"> -->
        <canvas width="400" height="66" ref="canvas"></canvas>
    </div>
</template>
<script>
    import SoundCloudWaveform from '../lib/WaveForm';
    export default {
        props: ['blob'],
        watch: {
            blob(value) {
                SoundCloudWaveform.generate(value, {
                    onComplete: (png, pixels) => {
                        // var canvas = document.getElementById('showcase');
                        var context = this.$refs.canvas.getContext('2d');
                        context.putImageData(pixels, 0, 0);
                    }
                });
            }
        },
        methods: {
            // change(e) {

            //     SoundCloudWaveform.generate(e.target.files[0], {
            //         onComplete: (png, pixels) => {
            //             // var canvas = document.getElementById('showcase');
            //             var context = this.$refs.canvas.getContext('2d');
            //             context.putImageData(pixels, 0, 0);
            //         }
            //     });

            // }
        }
    };
</script>
