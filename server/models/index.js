const dbConfig = require('../config/db.config.js')


const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// default setup of mongoose. creating an empty object and passing values to be used for setup
const db = {}
// passing the entire mongoose middleware
db.mongoose = mongoose;
// setting a url from dbConfig
db.url = dbConfig.url
// require our model and passing mongoose middleware
db.tutorials = require('./tutorial.model.js')(mongoose)


module.exports = db;
