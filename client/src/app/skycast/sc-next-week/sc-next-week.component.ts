import { Component, OnInit } from '@angular/core';

import { SkycastService } from "./../skycast.service";
import { CookieService } from "ngx-cookie";

@Component({
	selector: 'app-sc-next-week',
	templateUrl: './sc-next-week.component.html',
	styleUrls: ['./sc-next-week.component.css', './../skycast.component.css']
})
export class ScNextWeekComponent implements OnInit {

	constructor(private skycastService: SkycastService, private cookieService: CookieService) { }

	searchInfo = {};

	ngOnInit() {
		//initilize our weather data and cookies
		this.skycastService.initData();
		this.skycastService.initCookie();
	}

	// takes a datetime argument, creates a JS Date object, returns a formatted string of that date
	getDate(datetime){
		var d = new Date(datetime);
		return d.toLocaleString("en-US", {weekday:"long", month: "long", day: "numeric", timeZone: this.skycastService.weatherData["timezone"] });
	}

	// sets the chart ready state to false and calls addressSearch from the service giving the entered search info
	addressSearch(){
		this.skycastService.addressSearch(this.searchInfo);
	}

	removeCookies(){
		this.cookieService.removeAll();
	}

}
