import {Routes, RouterModule} from "@angular/router";
import { SkycastComponent } from "./skycast/skycast.component";
import { ScHomeComponent } from "./skycast/sc-home/sc-home.component";

const APP_ROUTES: Routes = [

	{ path: "", redirectTo: "/home", pathMatch: "full"},
	{ path: "home", component: ScHomeComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
