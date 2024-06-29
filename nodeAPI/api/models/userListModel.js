'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    Username: {
        type: String,
        required: 'Please enter'
    },
    Password: {
        type: String,
        required: 'Please enter'
    },
}, { collection: 'User' });

var EventSchema = new Schema({
    Date: {
        type: Date,
        required: 'Please enter'
    },
    Time: {
        type: String,
        required: 'Please enter'
    },
    EventName: {
        type: String,
        required: 'Please enter'
    },
    Description: {
        type: String,
        required: 'Please enter'
    },
}, { collection: 'Events' });


const Event = mongoose.model('Event', EventSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = { Event, Account };
