import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { CookieModule } from "ngx-cookie";

import { AppComponent } from './app.component';
import { SkycastComponent } from './skycast/skycast.component';
import { ScHomeComponent } from './skycast/sc-home/sc-home.component';

import { SkycastService } from "./skycast/skycast.service";

import { routing } from "./app.routes";
import { ScTomorrowComponent } from './skycast/sc-tomorrow/sc-tomorrow.component';
import { ScNextWeekComponent } from './skycast/sc-next-week/sc-next-week.component';
import { ScSearchHistoryComponent } from './skycast/sc-search-history/sc-search-history.component';

@NgModule({
  declarations: [
    AppComponent,
    SkycastComponent,
    ScHomeComponent,
    ScTomorrowComponent,
    ScNextWeekComponent,
    ScSearchHistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	ChartsModule,
	CookieModule.forRoot(),
	routing
  ],
  providers: [SkycastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
