import { Component, OnInit } from '@angular/core';

import { SkycastService } from "./../skycast.service";
import { CookieService } from "ngx-cookie";

@Component({
	selector: 'app-sc-historic-search',
	templateUrl: './sc-historic-search.component.html',
	styleUrls: ['./sc-historic-search.component.css', './../skycast.component.css']
})
export class ScHistoricSearchComponent implements OnInit {

	constructor(private skycastService: SkycastService, private cookieService: CookieService) { }

	chartReady = false;
	searchInfo = {};
	years = [];
	months = [];
	days = [];

	//------------Setting up settings for our chart library-----------
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

	public chartClicked(e:any):void {
		console.log(e);
	}

	public chartHovered(e:any):void {
		console.log(e);
	}

	//--------------------------------------------------------------------------

	ngOnInit() {
		//initilize our weather data, cookie, and fill in our date dropdowns on component load
		this.skycastService.initData();
		this.skycastService.initCookie();
		this.dateSelectors();
	}

	ngDoCheck(){
		//if we have weather data and the chart isn't ready, we call the barchartData function which prepares our bar chart variables and sets the chart status to ready
		if(this.skycastService.historic.weatherData["hourly"] && !this.chartReady){
			this.barchartData(this.skycastService.historic.weatherData["hourly"].data);
		}
	}

	// sets the chart ready state to false and calls historicAddressSearch from the service giving the entered search info
	addressSearch(){
		this.chartReady = false;
		this.skycastService.historicAddressSearch(this.searchInfo);
	}

	removeCookies(){
		this.cookieService.removeAll();
	}

	//takes an argument of weather data and assigns it to the chart variables. It then sets chartReady to true, which will allow the chart to be drawn with the given data
	barchartData(data){
		this.barChartLabels = [];
		this.barChartData[0].data = [];
		this.barChartData[0].label = "Temperature";
		for(var i = 0; i <24; i++){
			var date = new Date(data[i].time * 1000);
			this.barChartLabels.push([date.toLocaleString("en-US", {hour: "numeric", timeZone: this.skycastService.historic.weatherData["timezone"] }), data[i].summary]);
			this.barChartData[0].data.push(Math.floor(data[i].temperature))
		}
		this.chartReady = true;
	}

	// takes a datetime argument, creates a JS Date object, returns a formatted string of that date
	getDate(datetime){
		var d = new Date(datetime);
		return d.toLocaleString("en-US", {weekday:"long", month: "long", day: "numeric", year: "numeric", timeZone: this.skycastService.historic.weatherData["timezone"] });
	}

	//creates the arrays for the date dropdowns
	dateSelectors(){
		for(var i = 1; i <= 12; i++){
			if(i < 10){
				this.months.push("0" + i);
			}
			else{
				this.months.push(i + "");
			}
		}

		for(var i = 1; i <= 31; i++){
			if(i < 10){
				this.days.push("0" + i);
			}
			else{
				this.days.push(i + "");
			}
		}

		for(var i = (new Date()).getFullYear(); i >= 1000; i--){
			this.years.push(i);
		}
	}

}
