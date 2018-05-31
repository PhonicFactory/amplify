<style lang="scss">
    .audio-wave {
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div class="audio-wave">
        <canvas ref="canvas" :height="height" :width="width"></canvas>
    </div>
</template>
<script>
    /**
     * Abstracted from SoundCloud-Waveform-Generator and converted for Vue
     * https://github.com/Idnan/SoundCloud-Waveform-Generator
     */
    export default {
        props: {
            blob: {
                type: Blob,
                required: true
            },
            barWidth: {
                type: Number,
                required: false,
                default: 3
            },
            barGap: {
                type: Number,
                required: false,
                default: 0.2
            },
            waveColor: {
                type: String,
                required: false,
                default: '#666'
            }
        },
        data() {
            return {
                internalCanvas: document.createElement('canvas'), // Hidden canvas
                audioContext: new AudioContext(),
                height: 0,
                width: 0
            }
        },
        watch: {
            blob(value) {
                const reader = new FileReader();
                // Set up canvases for rendering
                this.height = this.$el.offsetHeight;
                this.width = this.$el.offsetWidth;
                this.internalCanvas.height = this.height;
                this.internalCanvas.width = this.width;
                // Read file buffer
                reader.onload = (e) => {
                    this.audioContext.decodeAudioData(e.target.result, (buffer) => {
                        this.extractBuffer(buffer);
                    });
                };
                reader.readAsArrayBuffer(value);
            }
        },
        methods: {
            extractBuffer(originalBuffer, resolve, reject) {
                const buffer = originalBuffer.getChannelData(0);
                const canvas = this.internalCanvas;
                const context = canvas.getContext('2d');
                const height = canvas.height;
                const width = canvas.width;
                const len = Math.floor(buffer.length / width);
                const vals = [];
                let scale;
                let val;
                for (let i = 0; i < width; i += this.barWidth) {
                    vals.push(this.bufferMeasure(i * len, len, buffer) * 10000);
                }
                for (let j = 0; j < width; j += this.barWidth) {
                    scale = height / Math.max.apply(null, vals);
                    val = this.bufferMeasure(j * len, len, buffer) * 10000;
                    val *= scale;
                    val += 1;
                    this.drawBar(canvas, context, j, val);
                }
                // Draw visible canvas
                this.$refs.canvas.getContext('2d').putImageData(context.getImageData(0, 0, width, height), 0, 0);
                // Clear canvas for redrawing
                context.clearRect(0, 0, width, height);
            },
            bufferMeasure(position, length, data) {
                let sum = 0.0;
                for (let i = position; i <= (position + length) - 1; i++) {
                    sum += Math.pow(data[i], 2);
                }
                return Math.sqrt(sum / data.length);
            },
            drawBar(canvas, context, i, h) {
                context.fillStyle = this.waveColor;
                let w = this.barWidth;
                if (this.barGap !== 0) {
                    w *= Math.abs(1 - this.barGap);
                }
                const x = i + (w / 2);
                const y = canvas.height - h;
                context.fillRect(x, y, w, h);
            }
        }
    };
</script>
