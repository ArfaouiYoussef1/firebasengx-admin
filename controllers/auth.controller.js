import mongoose from 'mongoose';
import passport from 'passport';
import config  from '../config/index';
import express from 'express';
import jwt from 'jsonwebtoken';

let router = express.Router();
let User = require("../models/user");


const AuthController = {};

AuthController.signUp = async (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please  username and password.'});
    } else {
let        newUser = new User({
            username: req.body.username,
            password: req.body.password,
    phoneNumber:req.body.phoneNumber
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
};
AuthController.login = async (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    let token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 60*60*24*30 // 1 week
                    });
                    // return the information including token as JSON
                    res.json({success: true, token: token,
                        user:user});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};


AuthController.logout = async (req, res) => {
    req.logout();
    res.status(200).send('Successfully logged out');
};
export default AuthController;
