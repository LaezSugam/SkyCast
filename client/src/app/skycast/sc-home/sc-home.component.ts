import { Component, OnInit } from '@angular/core';

import { SkycastService } from "./../skycast.service";

@Component({
	selector: 'app-sc-home',
	templateUrl: './sc-home.component.html',
	styleUrls: ['./sc-home.component.css']
})
export class ScHomeComponent implements OnInit {

	constructor(private skycastService: SkycastService) { }

	location = {};


	ngOnInit() {
		//   if(navigator.geolocation){
		// 	  console.log("location")
		// 	  navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
		//   }
		this.getLocation()
		console.log("location", location)
	}

	// setPosition(position){
	//  this.location = position.coords;
	//  console.log("Location:", this.location);
	// }

	getLocation(){
		this.skycastService.getLocation()
			.then((data) => {
				this.location = data.location;
			})

	}

}
