<style lang="scss">
    .audio-player {
        width: 100%;
        align-items: center;
        height: 48px;

        // .play-button {}

        .metadata {
            flex: 1;
        }

        .audio-wave-container {
            position: relative;
            height: 33px;

            .progress {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background-color: rgba(0,0,0,.15);
                transform: scale(0, 1);
                transform-origin: 0;
                // transition: transform .3s linear;
            }
        }

        .audio-time {
            line-height: 10px;
            font-size: 10px;
            margin-top: 5px;
            justify-content: space-between;
            opacity: .8;
        }

        .player {
            height: 0;
            visibility: hidden;
        }
    }
</style>
<template>
    <md-layout class="audio-player">
        <!-- :disabled="!canPlay" -->
        <template v-if="audioSrc">
            <md-button class="md-icon-button md-raised" @click="togglePlaying">
                <md-icon v-if="playing">pause</md-icon>
                <md-icon v-else>play_arrow</md-icon>
            </md-button>
            <md-layout class="metadata" :md-column="true">
                <div class="audio-wave-container">
                    <audio-wave :src="audioSrc"/>
                    <div class="progress" :style="{ transform: `scale(${progress}, 1)` }"/>
                </div>
                <md-layout class="audio-time">
                    <span>{{currentTime}}</span>
                    <span>{{totalTime}}</span>
                </md-layout>
            </md-layout>
            <audio
                class="player"
                ref="player"
                preload
                controls
                :src="`data:audio/webm;base64,${audioSrc}`"
                @durationchange="durationchange"
                @timeupdate="timeupdate"
                @ended="ended"
                @loadedmetadata="loadedmetadata"
            />
        </template>
        <md-layout v-else md-align="center" md-vertical-align="center">
            <md-spinner md-indeterminate />
        </md-layout>
    </md-layout>
</template>
<script>

    export default {
        props: ['src'],
        data() {
            return {
                audioSrc: null,
                currentTime: 0,
                totalTime: 0,
                playing: false,
                progress: 0,
                // canPlay: false
            }
        },
        mounted() {
            this.setSrc();
        },
        watch: {
            src(value) {
                // this.canPlay = false;
                this.setSrc();
            },
            currentTime(time) {
                // TODO: FIX duration = Infinity problem
                // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
                // http://victorblog.com/2018/02/14/get-video-and-audio-blob-duration-in-html5/
                // Request animation frame could make this smoother...
                this.progress = time / this.totalTime;
            }
        },
        methods: {
            setSrc() {
                // if (typeof this.src === 'object') {
                // this.audioSrc = window.URL.createObjectURL(`data:audio/webm;base64,${this.src}`);
                // } else {
                if (this.src) {
                    this.audioSrc = this.src;
                }
                // }
            },
            togglePlaying() {
                if (!this.playing) {
                    this.$refs.player.play();
                } else {
                    this.$refs.player.pause();
                }
                this.playing = !this.playing;
            },
            durationchange({ target }) {
                this.totalTime = target.duration;
                // console.log(this.totalTime);
            },
            timeupdate({ target }) {
                // console.log(target.currentTime);
                /* if (!this.canPlay) {
                    // Workaround duration = Infinity
                    // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
                    this.totalTime = target.duration;
                    // console.log(this.totalTime);
                    this.$refs.player.currentTime = 0;
                    this.canPlay = true;
                    return;
                } */
                this.currentTime = target.currentTime;
            },
            ended() {
                this.playing = false;
            },
            loadedmetadata({ target }) {
                console.log('loadedmetadata', target.duration);

                /* if(target.duration === Infinity) {
                    target.currentTime = Number.MAX_SAFE_INTEGER
                    // this.$nextTick(() => {
                    //     target.currentTime = 0;
                    // });
                    // tempVideoEl.ontimeupdate = () => {
                    // tempVideoEl.ontimeupdate = null
                    // resolve(tempVideoEl.duration)
                    // tempVideoEl.currentTime = 0
                    // }
                    // this.$nextTick(() => {
                    //     target.currentTime = 0;
                    // });
                }
                // Normal behavior
                else {
                    this.totalTime = target.duration;
                    this.canPlay = true;
                    // resolve(tempVideoEl.duration)
                } */
            }
        }
    };
</script>
