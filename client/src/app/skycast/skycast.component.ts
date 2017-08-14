import { Component, OnInit } from '@angular/core';

import { SkycastService } from "./skycast.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-skycast',
  templateUrl: './skycast.component.html',
  styleUrls: ['./skycast.component.css']
})
export class SkycastComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
