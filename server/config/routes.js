// var mongoose = require('mongoose');
// var users = require("../controllers/users.js");
// var questions = require("../controllers/questions.js");
// var scores = require("../controllers/scores.js");

var darksky = require("./darksky.js");
var gmaps = require("./gmaps.js");

var path = require("path")

module.exports = function(app){



	app.get("/logout", function(req, res){
		console.log("logging out");
		users.logout(req, res);
	})

	app.get("/checkUser", function(req, res){
		users.checkUser(req, res);
	})

	app.post("/getForecast", function(req, res){
		console.log("Getting forecast");
		darksky.getForecast(req, res);
	})

	app.post("/getAddy", function(req, res){
		console.log("Getting Address");
		gmaps.getAddy(req, res);
	})

	app.post("/search", function(req, res){
		gmaps.search(req, res);
	})

	app.get("/questions", function(req, res){
		console.log("getting questions");
		questions.show(req, res);
	})

	app.post("/question", function(req, res){
		console.log("adding question")
		questions.add(req, res);
	})

	app.get("/scores", function(req, res){
		console.log("getting scores");
		scores.show(req, res);
	})

	app.post("/score", function(req, res){
		scores.add(req, res);
	})

	app.get("*", function(req, res){
	    res.sendFile(path.resolve("client/dist/index.html"))
	})

}
