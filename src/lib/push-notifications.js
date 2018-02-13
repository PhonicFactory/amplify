import store from '../store';
import { urlBase64ToUint8Array } from './helpers';

function setSubscription(subscription) {
    if (!subscription) {
        return;
    }
    store.dispatch('setClientPushSubscription', subscription.toJSON());
}

function subscribeNew() {
    // https://github.com/GoogleChromeLabs/web-push-codelab/blob/master/app/scripts/main.js
    // https://developers.google.com/web/updates/2016/03/web-push-encryption
    store.getters.pushManager
        .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BDMSHpw-NahrF4bo9OyFOR8cv9Og1mGHfYCHuDCTeBmZJfDKdBeJ2rQvtPio_ZvrMGT0Om2scRGx28qaQHu5Zbk')
        })
        .then((subscription) => {
            setSubscription(subscription);
            store.dispatch('subscribeToServerPushNotifications');
        })
        .catch((e) => {
            console.log('error getting push subscription')
        });
}

export { setSubscription };

export function getSubscription() {
    return store.getters.pushManager.getSubscription();
}

export function subscribe() {
    store.getters.pushManager
        .getSubscription()
        .then((subscription) => {
            if (subscription) {
                setSubscription(subscription);
                return;
            }
            // Prompt user to subscribe for notifications
            subscribeNew();
        });
}

export function unsubscribe() {
    store.getters.pushManager.getSubscription()
        .then((subscription) => {
            subscription
                .unsubscribe({ userVisibleOnly: true })
                .then(() => {
                    store.dispatch('setClientPushSubscription', null);
                    store.dispatch('unsubscribeToServerPushNotifications');
                });
        });
}
