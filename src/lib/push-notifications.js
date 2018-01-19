import store from '../store';
import { urlB64ToUint8Array } from './helpers';

function setSubscription(subscription) {
    console.log(subscription);
    store.dispatch('setPushSubscription', subscription);
}

function subscribeNew() {
    // https://github.com/GoogleChromeLabs/web-push-codelab/blob/master/app/scripts/main.js
    // https://developers.google.com/web/updates/2016/03/web-push-encryption
    store.getters.pushManager
        .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array('BJjJDKQgGQVu6oqir1m2xFrKaR-8vOIlXHNAuRPIYL0RHhMomLSwxsi1nHEly4t8q4MHLnJLRQicnKKxpBga3qg')
        })
        .then(subscription => setSubscription(subscription.toJSON()))
        .catch((e) => {
            console.log('error getting push subscription')
        });
}

export function subscribe() {
    store.getters.pushManager
        .getSubscription()
        .then((subscription) => {
            if (subscription) {
                setSubscription(subscription.toJSON());
                return;
            }
            // Prompt user to subscribe for notifications
            subscribeNew();
        });
}
