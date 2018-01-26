import store from '../store';
import { urlBase64ToUint8Array } from './helpers';

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
            applicationServerKey: urlBase64ToUint8Array('BDMSHpw-NahrF4bo9OyFOR8cv9Og1mGHfYCHuDCTeBmZJfDKdBeJ2rQvtPio_ZvrMGT0Om2scRGx28qaQHu5Zbk')
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
