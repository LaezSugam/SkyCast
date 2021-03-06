import {Routes, RouterModule} from "@angular/router";
import { SkycastComponent } from "./skycast/skycast.component";
import { ScHomeComponent } from "./skycast/sc-home/sc-home.component";
import { ScTomorrowComponent } from "./skycast/sc-tomorrow/sc-tomorrow.component";
import { ScNextWeekComponent } from "./skycast/sc-next-week/sc-next-week.component";
import { ScSearchHistoryComponent } from "./skycast/sc-search-history/sc-search-history.component";
import { ScHistoricSearchComponent } from './skycast/sc-historic-search/sc-historic-search.component';


const APP_ROUTES: Routes = [

	{ path: "", redirectTo: "/home", pathMatch: "full"},
	{ path: "home", component: ScHomeComponent},
	{ path: "tomorrow", component: ScTomorrowComponent},
	{ path: "nextweek", component: ScNextWeekComponent},
	{ path: "searchhistory", component: ScSearchHistoryComponent},
	{ path: "historicsearch", component: ScHistoricSearchComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
