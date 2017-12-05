<template>
    <md-layout :md-column="true">
        <md-toolbar class="md-dense">
            <h2 class="md-title" style="flex: 1">Calls</h2>
            <md-button class="md-icon-button">
                <md-icon>search</md-icon>
            </md-button>
        </md-toolbar>
        <template v-if="authenticated">
            <md-list v-if="status === 'success'">
                <md-list-item v-for="call in calls" :key="call.id">
                    <md-avatar>
                        <!-- <img :src="call.user.avatar" alt="People"> -->
                    </md-avatar>
                    <span>{{ convo.user.name }}</span>
                    <md-button class="md-icon-button md-list-action">
                        <md-icon class="md-primary">chat_bubble</md-icon>
                    </md-button>
                    <md-divider class="md-inset"></md-divider>
                </md-list-item>
            </md-list>
            <md-layout v-if="status === 'pending'" md-align="center" md-vertical-align="center">
                <md-spinner md-indeterminate />
            </md-layout>
            <h2 v-if="status === 'reject'">Error retrieving calls</h2>
        </template>
        <template v-else>
            <h2>You need to log in</h2>
        </template>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        mounted() {
            if (this.authenticated) {
                this.getAllCalls();
            }
        },
        computed: {
            ...mapGetters({
                calls: 'allCalls',
                status: 'allCallsStatus',
                authenticated: 'authenticated'
            })
        },
        watch: {
            status(value) {
                if (value === 'rejected') {
                    this.$router.push({ name: 'register' });
                }
            }
        },
        methods: {
            ...mapActions([
                'getAllCalls'
            ])
        }
    };
</script>
