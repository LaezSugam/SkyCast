import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";

import "rxjs"

const HEADERS = new Headers({"Content-Type": "application/json"})
const OPTIONS = new RequestOptions({headers: HEADERS})

@Injectable()
export class SkycastService {

	constructor(private http: Http) { }

	getLocation(){
		return this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC_4zFejr8bkSl6bCZ_Tk3Dt69kqPHw1f8", OPTIONS)
			.map(data => data.json()).toPromise();
	}

	getForecast(location){
		return this.http.post("/getForecast", location, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	getAddy(location){
		return this.http.post("/getAddy", location, OPTIONS)
			.map(data => data.json()).toPromise();
	}

	search(searchInfo){
		return this.http.post("/search", searchInfo, OPTIONS)
			.map(data => data.json()).toPromise();
	}

}
