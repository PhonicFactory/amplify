self.addEventListener('push', function(event) {
    var title = 'ET Push Message';
    // Data must be encypted by server sending message
    // See this: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications#working_with_data_payloads
    // var data = event.data.json();
    // console.log(data);
    console.log('Push message', arguments);
    event.waitUntil(
        self.registration.showNotification(title, {
            'body': 'Test message body',
            'icon': 'http://lorempixel.com/100/100/cats/1/'
        })
    );
});
