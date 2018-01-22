<template>
    <md-layout :md-column="true">
        <md-list v-if="status === 'success'">
            <md-list-item v-for="call in calls" :key="call.id">
                <md-icon class="md-primary">person_add</md-icon>
                <div class="md-list-text-container">
                    <span>{{ call.from_number }}</span>
                    <span>at {{ call.created_at }}</span>
                </div>
                <md-button class="md-icon-button md-list-action" @click="openCall(call)">
                    <md-icon class="md-primary">hearing</md-icon>
                </md-button>
                <md-divider class="md-inset"></md-divider>
            </md-list-item>
            <md-list-item v-if="!calls.length">
                No Calls
            </md-list-item>
        </md-list>
        <md-layout v-if="status === 'pending'" md-align="center" md-vertical-align="center">
            <md-spinner md-indeterminate />
        </md-layout>
        <h2 v-if="status === 'reject'">Error retrieving calls</h2>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { logout } from '../lib/auth';

    export default {
        mounted() {
            this.getAllCalls();
        },
        computed: {
            ...mapGetters({
                calls: 'allCalls',
                status: 'allCallsStatus'
            })
        },
        watch: {
            status(value) {
                if (value === 'rejected') {
                    // TODO: handle calls fail
                }
            }
        },
        methods: {
            ...mapActions([
                'getAllCalls',
                'getCallAudio'
            ]),
            openCall(call) {
                this.$emit('callSelected');
                this.getCallAudio(call);
            }
        }
    };
</script>
