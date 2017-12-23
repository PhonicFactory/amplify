import store from '../store';

export function register() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                // Handle service worker updated (ie, alert the user to reload)
                registration.onupdatefound = () => {
                    console.log('service worker update found');
                    // if (window.confirm("Update Available")) {
                    //     window.location.reload();
                    // }
                };
                // Detect document focus and check for sw updates on the server.
                // Useful for when app is opened, but not reloaded
                document.addEventListener('visibilitychange', () => {
                    if (!document.hidden) {
                        registration.update();
                    }
                });
                // Add registration to data store
                store.dispatch('setServiceWorkerRegistration', registration);
            });
    }
}
