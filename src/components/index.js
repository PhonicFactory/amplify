import Vue from 'vue';

/**
 * Custom Components
 */
Vue.component('audio-player', require('./audio-player.vue').default);
Vue.component('audio-recorder', require('./audio-recorder.vue').default);
Vue.component('audio-wave', require('./audio-wave.vue').default);
Vue.component('new-conversation', require('./new-conversation.vue').default);
Vue.component('new-message', require('./new-message.vue').default);
Vue.component('phone-input', require('./phone-input.vue').default);
