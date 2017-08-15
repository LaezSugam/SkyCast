// ------------------SETUP-----------------------------

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client/dist")));

app.use(express.static(path.join(__dirname, "./client/node_modules")));

app.use(session({secret: "jetisadog", resave: false, saveUninitialized: false}))



//--------------------------DB  SCHEMAS--------------------

//require("./server/config/mongoose.js");

// -------------------------ROUTES--------------------------

require("./server/config/routes.js")(app);

//--------------------LISTEN-----------------
var server = app.listen(process.env.PORT || 8000);
