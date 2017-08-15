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

	historic = {
		location: {},
		weatherData: {},
		city: "",
		searchResults: {},
		chartReady: false,
		searchHistory: {},
	}

	geoLocate(){
		return this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC_4zFejr8bkSl6bCZ_Tk3Dt69kqPHw1f8", OPTIONS)
			.map(data => data.json()).toPromise();
	}

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

	getForecast(location){
		return this.http.post("/getForecast", location, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	getHistoricForecast(info){
		return this.http.post("/getHistoricForecast", info, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	getAddy(location){
		return this.http.post("/getAddy", location, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	addressSearch(searchInfo){
		this.weatherData = {};
		this.chartReady = false;
		searchInfo.time = new Date();
		this.searchHistory["searches"].push(searchInfo);
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

	historicAddressSearch(searchInfo){
		this.historic.weatherData = {};
		this.historic.chartReady = false;
		searchInfo.time = new Date();
		this.historic.searchHistory["searches"].push(searchInfo);
		this.putCookie("historic_search_history", this.historic.searchHistory);
		this.search(searchInfo)
		.then((data) => {
			this.historic.searchResults = data.results;
			this.historic.location = data.results[0].geometry.location
			this.historic.city = this.getCity(data.results);
			var searchDate = new Date(searchInfo.date);
			
			var sd = searchInfo.date + "T00:00:00";
			this.getHistoricForecast({location: this.historic.location, date: sd}).then((data) => {
					this.historic.weatherData = data;
					console.log(data);
			})
		});
	}

	reSearchHistoric(searchInfo){
		this.historic.weatherData = {};
		this.historic.chartReady = false;
		searchInfo.time = new Date();
		this.search(searchInfo)
		.then((data) => {
			this.historic.searchResults = data.results;
			this.historic.location = data.results[0].geometry.location
			this.historic.city = this.getCity(data.results);
			var sd = searchInfo.date + "T00:00:00";
			this.getHistoricForecast({location: this.historic.location, date: sd}).then((data) => {
					this.historic.weatherData = data;
					this.router.navigate(["/historicsearch"]);
					console.log(data);
			})
		});
	}

	reSearch(searchInfo){
		this.weatherData = {};
		this.chartReady = false;
		this.search(searchInfo)
		.then((data) => {
			this.searchResults = data.results;
			this.location = data.results[0].geometry.location
			this.city = this.getCity(data.results);
			this.getForecast(this.location).then((data) => {
					this.weatherData = data;
					this.router.navigate(["/home"]);
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
