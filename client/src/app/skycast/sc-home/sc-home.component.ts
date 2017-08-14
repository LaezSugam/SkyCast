import { Component, OnInit } from '@angular/core';

import { SkycastService } from "./../skycast.service";
import { CookieService } from "ngx-cookie";

@Component({
	selector: 'app-sc-home',
	templateUrl: './sc-home.component.html',
	styleUrls: ['./sc-home.component.css']
})
export class ScHomeComponent implements OnInit {

	constructor(private skycastService: SkycastService, private cookieService: CookieService) { }

	location = {};
	weatherData = {};
	city = "";
	searchInfo = {};
	searchResults = {};
	chartReady = false;
	searchHistory = {};

	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true,
		maintainAspectRatio: false,
		tooltips: {
			enabled: false
		},
		scales: {
			yAxes: [{
				display: false,
				ticks: {
					suggestedMin: 30,
					suggestedMax: 100,
				}
			}],
			xAxes: [{
				ticks: {
					autoSkip: false
				}
			}]
		},
		animation: {
			onComplete: function () {
				var ctx = this.chart.ctx;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				var chart = this;
				var datasets = this.config.data.datasets;

				datasets.forEach(function (dataset: Array<any>, i: number) {
					ctx.fillStyle = "#666";
					chart.getDatasetMeta(i).data.forEach(function (p: any, j: any) {
						ctx.fillText(datasets[i].data[j] + "°", p._model.x, p._model.y - 20);
					});

				});
			}
		}
	};

	public barChartLabels = [];
	public barChartType:string = 'line';
	public barChartLegend:boolean = true;

	public barChartData:any[] = [
		{data: [], label: ''}
	];

	// events
	public chartClicked(e:any):void {
		console.log(e);
	}

	public chartHovered(e:any):void {
		console.log(e);
	}


	ngOnInit() {
		this.getLocation()
		this.initCookie();
		console.log(this.searchHistory);
	}

	addressSearch(){
		this.chartReady = false;
		this.skycastService.search(this.searchInfo)
		.then((data) => {
			this.searchResults = data.results;
			this.location = data.results[0].geometry.location
			this.city = this.getCity(data.results);
			this.getForecast(this.location)
		});
		this.searchHistory["searches"].push(this.searchInfo["search"]);
		this.putCookie("search_history", this.searchHistory);
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
			// console.log(data);
			this.barchartData(data.hourly.data);
		})
	}

	barchartData(data){
		this.barChartLabels = [];
		this.barChartData[0].data = [];
		this.barChartData[0].label = "Temperature";
		for(var i = 0; i <24; i++){
			var date = new Date(data[i].time * 1000);
			// var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			this.barChartLabels.push([date.getHours() + "", data[i].summary])
			this.barChartData[0].data.push(Math.floor(data[i].temperature))
		}
		this.chartReady = true;
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
