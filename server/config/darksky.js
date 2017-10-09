var request = require("request");

module.exports = {

	// Calls the DarkSky API, giving it a latitude and longitude. The API returns an object with forecast information for that location. We return the JSON object to the front end to be used.
	getForecast: function(req, res){
		request("https://api.darksky.net/forecast/550865e3e0678078a497ef371b72f958/" + req.body.lat + "," + req.body.lng, function(err, response, body){
			if(err){
				console.log("something went wrong");
				console.log(err);
				res.json(err);
			}
			else {
				console.log("we got it!");
				res.json(JSON.parse(body));
			}
		}
	)},

	// Calls the DarkSky API, giving it a latitude and longitude and date. The API returns an object with weather data for that location and date, which we return to the front end.
	getHistoricForecast: function(req, res){
		console.log(req.body);
		var searchURL = "https://api.darksky.net/forecast/550865e3e0678078a497ef371b72f958/" + req.body.location.lat + "," + req.body.location.lng + "," + req.body.date + "?exclude=flags";
		console.log(searchURL);
		request(searchURL, function(err, response, body){
			if(err){
				console.log("something went wrong");
				console.log(err);
				res.json(err);
			}
			else {
				console.log("we got it!");
				res.json(JSON.parse(body));
			}
		}
	)}
}
