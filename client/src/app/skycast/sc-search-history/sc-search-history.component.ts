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
		this.skycastService.initData();
		this.skycastService.initCookie();
	}

	removeCookies(){
		this.cookieService.removeAll();
	}

	reSearch(searchInfo){
		console.log(searchInfo);
		this.skycastService.reSearch({search: searchInfo});
	}

}
