var request = require("request");

module.exports = {

	// Call the Google Maps giving it a longitude and latitude and returning an object with address information.
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

	// Call the Google Geocoding API giving it search criteria, which is returned and latitude and longitude.
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
