import store from '../store';

function setSubscription(subscription) {
    store.dispatch('setPushSubscription', subscription);
}

function subscribeNew() {
    store.getters.pushManager
        .subscribe({ userVisibleOnly: true })
        .then(subscription => setSubscription(subscription))
        .catch((e) => {
            console.log('error getting push subscription')
        });
}

export function subscribe() {
    store.getters.pushManager
        .getSubscription()
        .then((subscription) => {
            console.log(subscription);
            if (subscription) {
                setSubscription(subscription);
                return;
            }
            // Prompt user to subscribe for notifications
            subscribeNew();
        });
}
