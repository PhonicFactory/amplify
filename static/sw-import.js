/**
 * Handle push notification
 * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
 */
self.addEventListener('push', function(event) {
    var data = {
        title: 'New Message',
        icon: 'https://amplify.eartickling.com/images/launcher-icon-4x.png', // TODO: Move this to s3
        body: 'You have a new voice message',
        data: {
            url: 'https://amplify.eartickling.com'
        }
    };
    try {
        data = Object.assign({}, data, event.data.json());
    } catch(e) {
        console.log('Error getting notification data', e);
    }
    event.waitUntil(
        self.registration.showNotification(data.title, data)
    );
});

/**
 * Handle notification click
 * https://developer.mozilla.org/en-US/docs/Web/Events/notificationclick
 */
self.addEventListener('notificationclick', function(event) {
    var appUrl = location.protocol + '//' + location.host;
    var data = event.notification.data;
    var navigationUrl = '/';
    event.notification.close();
    if (data.conversation_id && data.call_id) {
        navigationUrl += 'conversation/' + data.conversation_id + '/call/' + data.call_id;
    }
    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if ((new RegExp(appUrl)).test(client.url) && 'focus' in client) {
                return client.navigate(navigationUrl)
                    .then(function(c){
                        return c.focus();
                    });
            }
        }
        if (clients.openWindow) {
            return clients.openWindow(navigationUrl);
        }
    }));
});
