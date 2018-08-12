<style scoped>
    .md-toolbar .md-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .md-card .md-card-actions {
        justify-content: flex-start;
        padding-left: 16px !important;
    }
    .md-card {
        box-shadow: none;
    }
</style>
<template>
    <md-layout md-column>
        <md-toolbar class="md-dense">
            <md-button class="md-icon-button" @click="goBack">
                <md-icon>arrow_back</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">
                {{ podcast ? podcast.title : '' }}
            </h2>
        </md-toolbar>
        <md-layout md-column>
            <md-card v-if="podcast">
                <img :src="podcast.img" :alt="podcast.title">
                <md-card-header>
                    <div class="md-title" v-text="podcast.name"/>
                    <div class="md-subhead" v-text="podcast.title"/>
                </md-card-header>
                <md-card-actions>
                    <md-button class="md-raised md-primary" @click.prevent="openAudio">
                        Play
                    </md-button>
                </md-card-actions>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
                </md-card-content>
            </md-card>
        </md-layout>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        props: ['id'],
        mounted() {
          if (!this.podcast) {
            this.goBack();
          }
        },
        computed: {
            ...mapGetters({
                podcast: 'activePodcast'
            })
        },
        methods: {
          goBack() {
            this.$router.push({ name: 'podcasts' })
          },
          openAudio() {
              window.open(this.podcast.audio);
          }
        }
    };
</script>
