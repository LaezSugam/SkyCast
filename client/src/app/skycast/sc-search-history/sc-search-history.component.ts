import { Component, OnInit } from '@angular/core';

import { SkycastService } from "./../skycast.service";
import { CookieService } from "ngx-cookie";

@Component({
	selector: 'app-sc-search-history',
	templateUrl: './sc-search-history.component.html',
	styleUrls: ['./sc-search-history.component.css']
})
export class ScSearchHistoryComponent implements OnInit {

	constructor(private skycastService: SkycastService, private cookieService: CookieService) { }

	ngOnInit() {
		//initilize our weather data and cookies
		this.skycastService.initData();
		this.skycastService.initCookie();
	}

	removeCookies(){
		this.cookieService.removeAll();
	}

	//takes search info (added to the view by looking at the cookie) and does a new search or historic search using that information
	reSearch(searchInfo){
		console.log(searchInfo);
		if(searchInfo.year){
			this.skycastService.reSearchHistoric(searchInfo);
		}
		else{
			this.skycastService.reSearch(searchInfo);
		}
	}

}
