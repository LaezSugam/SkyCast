import { Component, OnInit } from '@angular/core';

import { SkycastService } from "./../skycast.service";

@Component({
	selector: 'app-sc-home',
	templateUrl: './sc-home.component.html',
	styleUrls: ['./sc-home.component.css']
})
export class ScHomeComponent implements OnInit {

	constructor(private skycastService: SkycastService) { }

	location = {};
	weatherData = {};
	city = "";
	searchInfo = {};
	searchResults = {};


	ngOnInit() {
		this.getLocation()
	}

	addressSearch(){
		this.skycastService.search(this.searchInfo)
		.then((data) => {
			this.searchResults = data.results;
			this.location = data.results[0].geometry.location
			this.city = this.getCity(data.results);
			this.getForecast(this.location)
		});
	}


	getLocation(){
		this.skycastService.getLocation()
		.then((data) => {
			this.location = data.location;
			// console.log(data);
			this.getForecast(data.location);
			this.getAddy(data.location);
		})
	}

	getForecast(location){
		this.skycastService.getForecast(location)
		.then((data) => {
			this.weatherData = data;
			console.log(data);
		})
	}

	getAddy(location){
		this.skycastService.getAddy(location)
		.then((data) => {
			// console.log(data);
			this.city = this.getCity(data.results);
		})
	}

	getCity(geocodeResults){
		var city = "";
		var state = "";
		// console.log(geocodeResults);
		// for(var i = 0; i < geocodeResults.length; i++){
		// 	if(geocodeResults[i].types.includes("street_address")){
		// 		for(var j = 0; j < geocodeResults[i].address_components.length; j++){
		// 			if(geocodeResults[i].address_components[j].types.includes("locality")){
		// 				city = geocodeResults[i].address_components[j].long_name;
		// 			}
		// 			else if(geocodeResults[i].address_components[j].types.includes("administrative_area_level_1")){
		// 				state = geocodeResults[i].address_components[j].short_name;
		// 			}
		// 		}
		// 	}
		// }

		for(var j = 0; j < geocodeResults[0].address_components.length; j++){
			if(geocodeResults[0].address_components[j].types.includes("locality")){
				city = geocodeResults[0].address_components[j].long_name;
			}
			else if(geocodeResults[0].address_components[j].types.includes("administrative_area_level_1")){
				state = geocodeResults[0].address_components[j].short_name;
			}
		}
		return city + ", " + state;
	}

}
