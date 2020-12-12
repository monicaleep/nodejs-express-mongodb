// Express is for building the Rest apis
const express = require("express");
// body-parser helps to parse the request and create the req.body object
const bodyParser = require("body-parser");
// cors provides Express middleware to enable CORS with various options.
const cors = require("cors");

const app = express()

// use course middleware
app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());

//MongoDB and mongoose setup
const db = require('./server/models')
// connect to the database using mongoose method. db.url passed in from db.config.js
db.mongoose.connect(db.url, {
  // some stuff we just need to put
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
  console.log('connected to the database')
}).catch(err=>{
  console.log('Error connecting to db',err)
  // exit out so we don't see so many errors
  process.exit()
})

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our node application." });
});

// require all the routes
require('./server/routes/tutorial.routes.js')(app)



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


/*
###### The routes we will be creating! #########
###### You should have something like this in your readme so people know your routes that end up consuming your api #########

Methods  	Urls	Actions
GET   api/tutorials	get all Tutorials x
GET	  api/tutorials/:id	get Tutorial by id x
POST  api/tutorials	add new Tutorial x
PUT	  api/tutorials/:id	update Tutorial by id x
DELETE	api/tutorials/:id	remove Tutorial by id x
DELETE	api/tutorials	remove all Tutorials
GET	   api/tutorials/published	find all published Tutorials x
GET	   api/tutorials?title=[kw]	find all Tutorials which title contains 'kw'
*/
