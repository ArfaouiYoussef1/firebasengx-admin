var Pusher = require('pusher');

const pusher = new Pusher({
    appId: '737563',
    key: '94ca1b94ff66687f1b6b',
    secret: '993105fcd8c494f71223',
    cluster: 'mt1',
    encrypted: true
});

export default pusher;
pusher.trigger('my-channel', 'my-event', {
    "message": "hello world"
});
