import store from '../store';
import { urlBase64ToUint8Array } from './helpers';

function subscribeNew() {
    // https://github.com/GoogleChromeLabs/web-push-codelab/blob/master/app/scripts/main.js
    // https://developers.google.com/web/updates/2016/03/web-push-encryption
    store.getters.pushManager
        .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BDMSHpw-NahrF4bo9OyFOR8cv9Og1mGHfYCHuDCTeBmZJfDKdBeJ2rQvtPio_ZvrMGT0Om2scRGx28qaQHu5Zbk')
        })
        // .then(subscription => setSubscription(subscription.toJSON()))
        .then((subscription) => {
            store.dispatch('setClientPushSubscription', subscription.toJSON());
            store.dispatch('subscribeToServerPushNotifications');
        })
        .catch((e) => {
            console.log('error getting push subscription')
        });
}

export function subscribe() {
    store.getters.pushManager
        .getSubscription()
        .then((subscription) => {
            if (subscription) {
                store.dispatch('setClientPushSubscription', subscription.toJSON());
                return;
            }
            // Prompt user to subscribe for notifications
            subscribeNew();
        });
}
