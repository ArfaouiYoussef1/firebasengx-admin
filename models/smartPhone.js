const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const smartPhoneSchema = new Schema({
    task: { type: String }});

    module.exports = mongoose.model('smartPhone', smartPhoneSchema);


