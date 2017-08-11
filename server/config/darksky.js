var request = require("request");

module.exports = {

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
	)}
}
