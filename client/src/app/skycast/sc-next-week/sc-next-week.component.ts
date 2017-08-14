import { Component, OnInit } from '@angular/core';

import { SkycastService } from "./../skycast.service";
import { CookieService } from "ngx-cookie";

@Component({
	selector: 'app-sc-next-week',
	templateUrl: './sc-next-week.component.html',
	styleUrls: ['./sc-next-week.component.css']
})
export class ScNextWeekComponent implements OnInit {

	constructor(private skycastService: SkycastService, private cookieService: CookieService) { }

	searchInfo = {};

	ngOnInit() {
		this.skycastService.initData();
		this.skycastService.initCookie();
		// console.log(this.skycastService.searchHistory);
	}

	getDate(datetime){
		var d = new Date(datetime);
		return d.toLocaleString("en-US", {weekday:"long", month: "long", day: "numeric", timeZone: this.skycastService.weatherData["timezone"] });
	}

	addressSearch(){
		this.skycastService.addressSearch(this.searchInfo);
	}

	removeCookies(){
		this.cookieService.removeAll();
	}

}
