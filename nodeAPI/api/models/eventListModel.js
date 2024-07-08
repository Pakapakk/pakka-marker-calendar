'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    StartTime: {
        type: Date,
        required: 'Please enter'
    },
    EndTime: {
        type: Date,
        required: 'Please enter'
    },
    EventName: {
        type: String,
        required: 'Please enter'
    },
    City: {
        type: String,
        required: 'Please enter'
    },
    Country: {
        type: String,
        required: 'Please enter'
    },
    Description: {
        type: String,
        required: 'Please enter'
    },
}, { collection: 'Events' });


const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };
