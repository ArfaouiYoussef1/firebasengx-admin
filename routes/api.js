const task  = require('../models/task');
const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const pusher = new Pusher({
    appId: '737563',
    key: '94ca1b94ff66687f1b6b',
    secret: '993105fcd8c494f71223',
    cluster: 'mt1',
    encrypted: true
});
/* CREATE */
router.post('/new', (req, res) => {
    pusher.trigger('my-channel', 'my-event', {
        "message": "hello world"
    });

    /* pusher.trigger(req.body.serialNumber, 'my-event', {
        "message": "hello world"
    });*/

    task.create({
        phoneNumber: req.body.phoneNumber,
        username:req.body.username,
        serialNumber:req.body.serialNumber,
        Location:req.body.Location,
        photoUrl:req.body.photoUrl

    }, (err, task ) => {
        if (err) {
            console.log('CREATE Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(task);
        }
    });
});
router.route('/:id')
/* DELETE */
    .delete((req, res) => {
        task.findById(req.params.id, (err, task) => {
            if (err) {
                console.log('DELETE Error: ' + err);
                res.status(500).send('Error');
            } else if (task) {
                task.remove( () => {
                    res.status(200).json(task);
                });
            } else {
                res.status(404).send('Not found');
            }
        });
    });


module.exports = router;
