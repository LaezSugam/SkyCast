import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";

import "rxjs"

const HEADERS = new Headers({"Content-Type": "application/json"})
const OPTIONS = new RequestOptions({headers: HEADERS})

@Injectable()
export class SkycastService {

	constructor(private http: Http, private cookieService: CookieService, private router: Router) { }

	location = {};
	weatherData = {};
	city = "";
	searchResults = {};
	chartReady = false;
	searchHistory = {};
	message = "";

	historic = {
		location: {},
		weatherData: {},
		city: "",
		searchResults: {},
		chartReady: false,
		searchHistory: {},
	}

	//Calls the Google Geolocate API to get the user's location
	geoLocate(){
		return this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC_4zFejr8bkSl6bCZ_Tk3Dt69kqPHw1f8", OPTIONS)
			.map(data => data.json()).toPromise();
	}

	//Checks if there is already a location stored, if there is nothing is done
	//Otherwise we call geoLocate to get the user's current location. After the location is received we store the location and then get the forecast and address using the location we retrieved with geolocate and save that information
	initData(){
		if(this.location["lat"]){
			return;
		}
		this.geoLocate()
		.then((data) => {
			this.location = data.location;
			this.getForecast(data.location).then((data) => {
				this.weatherData = data;
			});
			this.getAddy(data.location).then((data) => {
			 		this.city = this.getCity(data.results);
			})
		})
	}

	// sends the location to the server, which calls the DarkSky API to get the forecast information. This is returned to us as JSON data which we return.
	getForecast(location){
		return this.http.post("/getForecast", location, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	// sends date and location information to the server, which then calls the DarkSky API to get the weather information for that date and location, which is returned as a JSON object
	getHistoricForecast(info){
		return this.http.post("/getHistoricForecast", info, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	//sends location formation (lat and long) to server, which calls the google geocode API and returns the address
	getAddy(location){
		return this.http.post("/getAddy", location, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	//takes in search info, adds it to the search history, which then is saved as a cookie
	//then the search function is called with the info, then uses the results to get the location and forecast information
	addressSearch(searchInfo){
		this.weatherData = {};
		this.message = "";
		this.chartReady = false;
		searchInfo.time = new Date();
		var savedSearch = {};
		for(var key in searchInfo){
			savedSearch[key] = searchInfo[key];
		}

		this.search(searchInfo)
		.then((data) => {

			if(data.status == "OK"){
				this.searchHistory["searches"].push(savedSearch);
				this.putCookie("search_history", this.searchHistory);
				this.searchResults = data.results;
				this.location = data.results[0].geometry.location
				this.city = this.getCity(data.results);
				this.getForecast(this.location).then((data) => {
					this.weatherData = data;
				})
			}
			else{
				console.log(data);
				this.message = "Not a valid city or zip code.";
			}
		});

	}

	//executes a search from the search history, then redirects to the home page using the returned weather info
	reSearch(searchInfo){
		this.weatherData = {};
		this.chartReady = false;
		this.message = "";
		this.search(searchInfo)
		.then((data) => {
			if(data.status == "OK"){
				this.searchResults = data.results;
				this.location = data.results[0].geometry.location
				this.city = this.getCity(data.results);
				this.getForecast(this.location).then((data) => {
					this.weatherData = data;
					this.router.navigate(["/home"]);
				})
			}
			else{
				this.message = "Not a valid city or zip code.";
				this.router.navigate(["/home"]);
			}
		});
	}

	//does the same as address search, but also takes in a date so that weather data for a specific past date can be found
	historicAddressSearch(searchInfo){
		this.message = "";
		this.historic.weatherData = {};
		this.historic.chartReady = false;
		searchInfo.time = new Date();
		var savedSearch = {};
		for(var key in searchInfo){
			savedSearch[key] = searchInfo[key];
		}

		this.search(searchInfo)
		.then((data) => {
			if(data.status == "OK"){
				this.historic.searchResults = data.results;
				this.historic.location = data.results[0].geometry.location
				this.historic.city = this.getCity(data.results);
				var sd = searchInfo.year + "-" + searchInfo.month + "-" + searchInfo.day + "T00:00:00";
				console.log(sd);
				this.getHistoricForecast({location: this.historic.location, date: sd}).then((data) => {
					if(data.code){
						this.message = "Invalid date.";
					}
					else{
						this.historic.searchHistory["searches"].push(savedSearch);
						this.putCookie("historic_search_history", this.historic.searchHistory);
						this.historic.weatherData = data;
					}
					console.log(data);
				})
			}
			else{
				console.log(data);
				this.message = "Not a valid city or zip code.";
			}
		});
	}

	//used to do an historic search from the user's search history, so it does not add the search to the search history. Also redirects to the history search page once the new data is retrieved, so the new chart can be displayed
	reSearchHistoric(searchInfo){
		this.message = "";
		this.historic.weatherData = {};
		this.historic.chartReady = false;
		searchInfo.time = new Date();
		this.search(searchInfo)
		.then((data) => {
			if(data.status == "OK"){
				this.historic.searchResults = data.results;
				this.historic.location = data.results[0].geometry.location
				this.historic.city = this.getCity(data.results);
				var sd = searchInfo.year + "-" + searchInfo.month + "-" + searchInfo.day + "T00:00:00";
				console.log(sd);
				this.getHistoricForecast({location: this.historic.location, date: sd}).then((data) => {
					if(data.code){
						this.message = "Invalid date.";
					}
					else{
						this.historic.weatherData = data;
					}
					this.router.navigate(["/historicsearch"]);
					console.log(data);
				})
			}
			else{
				this.message = "Not a valid city or zip code.";
				this.router.navigate(["/historicsearch"]);
			}
		});
	}



	//sends search address info to the server, which then calls the google geocoding API to get the lat and long
	search(searchInfo){
		return this.http.post("/search", searchInfo, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	//takes the google geocode results and formats into a more useful address
	getCity(geocodeResults){
		var city = "";
		var state = "";
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

	getCookie(key){
		return this.cookieService.getObject(key);
	}

	putCookie(key, value){
		this.cookieService.putObject(key, value);
	}

	removeCookies(){
		this.cookieService.removeAll();
	}

	//checks if a cookie exists, if it does sets the search history variables to the cookie information, otherwise sets up an empty cookie
	initCookie(){
		var tCookie = this.getCookie("search_history");
		var tHCookie = this.getCookie("historic_search_history");
		if(tCookie){
			this.searchHistory = tCookie;
			this.historic.searchHistory = tHCookie;
			// console.log("Cookie Found")
		}
		else{
			this.searchHistory = {"searches": []};
			this.historic.searchHistory = {"searches": []};
			this.putCookie("search_history", this.searchHistory);
			this.putCookie("historic_search_history", this.historic.searchHistory);
			console.log("No cookie found, creating cookie")
		}
	}

}
