'use strict'
var mongoose = require('mongoose')
const { Event, Account } = require('../models/userListModel');
var md5 = require('md5')

exports.listAllEvents = function(req, res){
    var query = { sort: { Time: 1 } }
    Event.find({}, null, query, function(err, event){
        if(err) throw err
        //console.log(event)
        res.json(event)
    })
}

exports.createEvent = function(req, res){
    var newEvent = new Event(req.body)
    newEvent.save(function(err, event){
        if(err) throw err
        res.json(event)
    })
}

exports.readEvent = function(req, res){
    //console.log(req.params.id)
    Event.findById(req.params.id, function(err, event){
        if(err) throw err
        res.json(event)
    })
}

exports.deleteEvent = function(req, res){
    //console.log(req.params.id)
    Event.findByIdAndRemove(req.params.id, function(err, event){
        if(err) throw err
        var response = {
            message: "Delete event id: "+ req.params.id +" successfully",
            id: event._id
        }
        res.json(response)
        console.log(response)
    })
}

exports.updateEvent = function(req, res){
    console.log(req.params.id)
    var newEvent = {}
    newEvent = req.body
    console.log(newEvent)
    Event.findByIdAndUpdate(req.params.id, newEvent, {new: true}, function(err, event){
        if(err) throw err
        console.log(event)
        res.json(event)
    })
}


exports.createAccount = (req, res) => {
    const { Username, Password } = req.body;
    const hashedPassword = md5(Password);
    const newAccount = new Account({
        Username,
        Password: hashedPassword
    });
    newAccount.save((err, account) => {
        if (err) {
            throw err
        }
        res.json(account);
    });
};
