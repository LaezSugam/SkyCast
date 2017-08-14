import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";
import { CookieService } from "ngx-cookie";

import "rxjs"

const HEADERS = new Headers({"Content-Type": "application/json"})
const OPTIONS = new RequestOptions({headers: HEADERS})

@Injectable()
export class SkycastService {

	constructor(private http: Http, private cookieService: CookieService) { }

	location = {};
	weatherData = {};
	city = "";
	searchResults = {};
	chartReady = false;
	searchHistory = {};

	geoLocate(){
		return this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC_4zFejr8bkSl6bCZ_Tk3Dt69kqPHw1f8", OPTIONS)
			.map(data => data.json()).toPromise();
	}

	initData(){
		this.geoLocate()
		.then((data) => {
			this.location = data.location;
			// console.log(data);
			this.getForecast(data.location).then((data) => {
				this.weatherData = data;
				return Promise.resolve(data);
			});
			this.getAddy(data.location).then((data) => {
					// console.log(data);
			 		this.city = this.getCity(data.results);
			})
		})
	}

	getForecast(location){
		return this.http.post("/getForecast", location, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	getAddy(location){
		return this.http.post("/getAddy", location, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	addressSearch(searchInfo){
		this.weatherData = {};
		this.chartReady = false;
		this.searchHistory["searches"].push(searchInfo["search"]);
		this.putCookie("search_history", this.searchHistory);
		this.search(searchInfo)
		.then((data) => {
			this.searchResults = data.results;
			this.location = data.results[0].geometry.location
			this.city = this.getCity(data.results);
			this.getForecast(this.location).then((data) => {
					this.weatherData = data;
			})
		});

	}

	search(searchInfo){
		return this.http.post("/search", searchInfo, OPTIONS)
			.map(data => data.json()).toPromise();
	}

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

	initCookie(){
		var tCookie = this.getCookie("search_history");
		if(tCookie){
			this.searchHistory = tCookie;
			console.log("Cookie Found")
		}
		else{
			this.searchHistory = {"searches": []};
			this.putCookie("search_history", this.searchHistory);
			console.log("No cookie found, creating cookie")
		}
	}

}
