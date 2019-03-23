const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
    phoneNumber: { type: String },
    username:{type:String},
    serialNumber:{type:String},
    Location:{type: String},
    photoUrl:{type: String}
});

module.exports = mongoose.model('Task', taskSchema);
