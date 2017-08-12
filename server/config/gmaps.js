var request = require("request");

module.exports = {

	getAddy: function(req, res){
		request("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + req.body.lat + "," + req.body.lng + "&key=AIzaSyDsSkmm5QzQsR9ET_K2oH-BfKo1BoQvSUY", function(err, response, body){
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

	search: function(req, res){
		console.log("geocoding:", req.body);
		request("https://maps.googleapis.com/maps/api/geocode/json?address=" + req.body.search + "&key=AIzaSyDsSkmm5QzQsR9ET_K2oH-BfKo1BoQvSUY", function(err, response, body){
			if(err){
				console.log("something went wrong");
				console.log(err);
				res.json(err);
			}
			else {
				console.log("we got it!");
				res.json(JSON.parse(body));
			}
		})
	}
}
