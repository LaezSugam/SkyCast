// var mongoose = require('mongoose');
// var users = require("../controllers/users.js");
// var questions = require("../controllers/questions.js");
// var scores = require("../controllers/scores.js");

var darksky = require("./darksky.js");
var gmaps = require("./gmaps.js");

var path = require("path")

module.exports = function(app){



	app.post("/getForecast", function(req, res){
		darksky.getForecast(req, res);
	})

	app.post("/getHistoricForecast", function(req, res){
		console.log("Getting historic forecast");
		darksky.getHistoricForecast(req, res);
	})

	app.post("/getAddy", function(req, res){
		console.log("Getting Address");
		gmaps.getAddy(req, res);
	})

	app.post("/search", function(req, res){
		gmaps.search(req, res);
	})

	app.get("*", function(req, res){
	    res.sendFile(path.resolve("client/dist/index.html"))
	})

}
