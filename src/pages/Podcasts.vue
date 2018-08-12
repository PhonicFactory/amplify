<style>
.md-list-text-container > * {
    white-space: normal;
}
</style>
<template>
    <md-layout md-column>
        <!-- TODO: make an toolbar component for md-toolbar -->
        <md-toolbar class="md-dense">
            <h2 class="md-title" style="flex: 1">Podcasts</h2>
            <md-button class="md-icon-button">
                <md-icon>search</md-icon>
            </md-button>
        </md-toolbar>
        <md-layout>
            <md-list v-if="podcasts.length" class="md-triple-line">
                <md-list-item v-for="podcast in podcasts" :key="podcast.id" @click="selected(podcast)">
                    <md-avatar>
                        <img :src="podcast.img" :alt="podcast.title">
                    </md-avatar>
                    <div class="md-list-text-container">
                        <span v-text="podcast.name" />
                        <span v-text="podcast.title" />
                        <p v-text="podcast.date" />
                    </div>
                    <div class="md-list-action">
                        <md-icon class="md-primary">chevron_right</md-icon>
                    </div>
                    <md-divider class="md-inset"></md-divider>
                </md-list-item>
            </md-list>
            <md-layout v-else-if="error">
                <md-spinner md-indeterminate />
            </md-layout>
            <md-layout v-else md-align="center" md-vertical-align="center">
                <md-spinner md-indeterminate />
            </md-layout>
        </md-layout>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                error: false
            };
        },
        mounted() {
            this.getAllPodcasts();
        },
        computed: {
            ...mapGetters({
               podcasts: 'allPodcasts'
            })
        },
        methods: {
            ...mapActions([
                'getAllPodcasts',
                'setActivePodcast'
            ]),
            selected(podcast) {
                this.setActivePodcast(podcast);
                this.$router.push({ name: 'podcast', params: { id: podcast.id } });
            }
        }
    };
</script>
