import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { generateToken, respond } from '../middleware/authMiddleware';
import passport from 'passport';

const router = new Router();
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Task  = require('../models/task');
router.post('/new', (req, res) => {
    Task.create({
        task: req.body.task,
    }, (err, task) => {
        if (err) {
            console.log('CREATE Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(task);
        }
    });
});

router.post('/register', (req, res) => {
    AuthController.signUp(req, res);
});

router.post('/login', (req, res, next) => {
    AuthController.login(req, res, next);
});
router.post('/new', (req, res) => {
    Task.create({
        task: req.body.task,
    }, (err, task) => {
        if (err) {
            console.log('CREATE Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(task);
        }
    });
});

/*router.post('/login', passport.authenticate(
    'local', {
        session: false,
        scope: []
    }), generateToken, respond); */
/*
router.post('/profile', (req, res) => {
    AuthController.profile(req, res);
});
*/


export default router;
