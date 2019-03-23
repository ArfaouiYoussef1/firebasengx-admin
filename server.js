import express from 'express';
import bodyParser from 'body-parser';
import connectToDb from './db/connect';
import passport from 'passport';
import user from './routes/user.routes';
import auth from './routes/auth.routes';
import User from './models/user';
const mongoose = require('mongoose');

const passportJWT = require("passport-jwt");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const Pusher = require('pusher');

const api = require('./routes/api');

// load unp the user model
import config from './config/index'
const server = express();

//connectToDb();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(passport.initialize());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
            console.log("waaaaeeeyn taaadit");
        } else {
            done(null, false);
        }
    });
}));

const pusher = new Pusher({
    appId: '737563',
    key: '94ca1b94ff66687f1b6b',
    secret: '993105fcd8c494f71223',
    cluster: 'mt1',
    encrypted: true
});
const channel = 'private-tasksuser';








server.use('/auth', auth);
server.use('/user', passport.authenticate('jwt', {session: false}), user);








server.use('/api', api);

mongoose.connect('mongodb+srv://youssef:24715492@cluster0-bvl5u.azure.mongodb.net/test?retryWrites=true\n');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
    server.listen(3000,() => {
        console.log('Node server running on port 9000');
    });
/*
    const taskCollection = db.collection('tasks');
    const changeStream = taskCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        if(change.operationType === 'insert') {
            const task = change.fullDocument;
            pusher.trigger(
                channel,
                'inserted',
                {
                    id: task._id,
                    phoneNumber: task.phoneNumber,
                    serialNumber:task.serialNumber,
                    Location:task.Location,
                    photoUrl:task.photoUrl

                }
            );
        } else if(change.operationType === 'delete') {
            pusher.trigger(
                channel,
                'deleted',
                change.documentKey._id
            );
        }
    });*/
});

