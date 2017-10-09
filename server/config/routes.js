var darksky = require("./darksky.js");
var gmaps = require("./gmaps.js");

var path = require("path")

module.exports = function(app){


	//call DarkSky API to get forecast information
	app.post("/getForecast", function(req, res){
		darksky.getForecast(req, res);
	})

	// call DarkSky API to get weather data from a date in the past
	app.post("/getHistoricForecast", function(req, res){
		darksky.getHistoricForecast(req, res);
	})

	//calls the Google Maps API with latitude and longitude, which returns a standard address
	app.post("/getAddy", function(req, res){
		gmaps.getAddy(req, res);
	})

	// calls the Google Maps geocoding API, giving it search criteria. The API returns with the latitude and longitude of the location.
	app.post("/search", function(req, res){
		gmaps.search(req, res);
	})

	app.get("*", function(req, res){
	    res.sendFile(path.resolve("client/dist/index.html"))
	})

}
