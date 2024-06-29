'use strict'
module.exports = function(app){
    var userList = require('../controllers/userListController')

    app.route('/events/getevents')
        .get(userList.listAllEvents)

    app.route('/events/addevent')
        .post(userList.createEvent)

    app.route('/events/update/:id')
        .get(userList.readEvent)
        .post(userList.updateEvent)
        
    app.route('/events/delete/:id')    
        .delete(userList.deleteEvent)
        
    app.route('/createaccount')
        .post(userList.createAccount)
}