import { Component, OnInit } from '@angular/core';

import { SkycastService } from "./../skycast.service";
import { CookieService } from "ngx-cookie";

@Component({
  selector: 'app-sc-tomorrow',
  templateUrl: './sc-tomorrow.component.html',
  styleUrls: ['./sc-tomorrow.component.css']
})
export class ScTomorrowComponent implements OnInit {

	constructor(private skycastService: SkycastService, private cookieService: CookieService) { }

  	chartReady = false;
  	searchInfo = {};


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


  	ngOnInit() {
  		this.skycastService.initData();
  		this.skycastService.initCookie();
  		// console.log(this.skycastService.searchHistory);
  	}

  	ngDoCheck(){
  		if(this.skycastService.weatherData["hourly"] && !this.chartReady){
  			this.barchartData(this.skycastService.weatherData["hourly"].data);
  		}
  	}

  	addressSearch(){
  		this.chartReady = false;
  		this.skycastService.addressSearch(this.searchInfo);
  	}

  	removeCookies(){
  		this.cookieService.removeAll();
  	}

  	barchartData(data){
  		this.barChartLabels = [];
  		this.barChartData[0].data = [];
  		this.barChartData[0].label = "Temperature";

		var tomStart = 24 - ((new Date(data[0].time * 1000)).getHours())

  		for(var i = tomStart; i < tomStart + 24; i++){
  			var date = new Date(data[i].time * 1000);
  			// var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  			this.barChartLabels.push([date.getHours() + "", data[i].summary])
  			this.barChartData[0].data.push(Math.floor(data[i].temperature))
  		}
  		this.chartReady = true;
  	}

  }
