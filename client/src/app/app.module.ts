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

@NgModule({
  declarations: [
    AppComponent,
    SkycastComponent,
    ScHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	ChartsModule,
	CookieModule.forRoot()
  ],
  providers: [SkycastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
