var express = require('express')
var cors = require('cors')

const fs = require('fs');

app = express()
app.use(cors())

const cred = JSON.parse(fs.readFileSync('cred.json', 'utf8'));
mongoURI = cred.MONGO_URI;

port = process.env.PORT || 3427
mongoose = require('mongoose')
User = require('./api/models/userListModel')
bodyParser = require('body-parser')
mongoose.Promise = global.Promise

mongoose.connect(mongoURI, function(error){
// mongoose.connect('mongodb://localhost/Userdb', function(error){
    if(error) throw error
    console.log('Successfully connected');
})

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var routes = require('./api/routes/userListRoutes')
routes(app)

app.listen(port)

console.log('User List started on : '+ port)

