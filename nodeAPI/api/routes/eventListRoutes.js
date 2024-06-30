'use strict'
module.exports = function(app){
    var eventList = require('../controllers/eventListController')

    app.route('/events/getevents')
        .get(eventList.listAllEvents)

    app.route('/events/readevent/:id')
        .get(eventList.readEvent)

    app.route('/events/addevent')
        .post(eventList.createEvent)

    app.route('/events/update/:id')
        .get(eventList.readEvent)
        .post(eventList.updateEvent)
        
    app.route('/events/delete/:id')    
        .delete(eventList.deleteEvent)
        
    app.route('/createaccount')
        .post(eventList.createAccount)
}