import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirLinesComponent } from './AdminComponents/air-lines/air-lines.component';
import { DiscountComponent } from './AdminComponents/discount/discount.component';
import { EditAirLineComponent } from './AdminComponents/edit-air-line/edit-air-line.component';
import { EditFlightsComponent } from './AdminComponents/edit-flights/edit-flights.component';

import { FlightsComponent } from './AdminComponents/flights/flights.component';
import { ScheduleFlightComponent } from './AdminComponents/schedule-flight/schedule-flight.component';
import { ViewBookingComponent } from './AdminComponents/view-booking/view-booking.component';
import { AppComponent } from './app.component';
import { AdminGuardGuard } from './Gaurds/admin-guard.guard';
import { UserGaurdGuard } from './Gaurds/user-gaurd.guard';
import { LogoutComponent } from './GlobalComponents/logout/logout.component';
import { UnauthorizedComponent } from './GlobalComponents/unauthorized/unauthorized.component';
//import { EditFlightsComponent } from './HelperClasses/AdminComponents/edit-flights/edit-flights.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddTweetComponent } from './TweetingComponents/add-tweet/add-tweet.component';
import { ViewAllTweetsComponent } from './TweetingComponents/view-all-tweets/view-all-tweets.component';
import { ViewTweetsComponent } from './TweetingComponents/view-tweets/view-tweets.component';
import { BookFlightComponent } from './UserComponents/book-flight/book-flight.component';
import { SearchFlightComponent } from './UserComponents/search-flight/search-flight.component';
import { UserTicketHistoryComponent } from './UserComponents/user-ticket-history/user-ticket-history.component';

const routes: Routes = [{path:'home',component:HomeComponent},{path:'login',component:LoginComponent},{path:'addTweet',component:AddTweetComponent},
{path:'register',component:RegisterComponent},{path:'',component:HomeComponent}
,{path:'unauth',component:UnauthorizedComponent},{path:'AdminAirlines',component:AirLinesComponent,canActivate:[AdminGuardGuard]},
{path:'editAirLine/:id',component:EditAirLineComponent},{path:'logout',component:LogoutComponent},{path:'redirect',redirectTo:''},{path:'refresh',component:AppComponent},{path:'loginRefresh',redirectTo:'/home',pathMatch:'full'}
,{path:'AdminFlights',component:FlightsComponent,canActivate:[AdminGuardGuard]},{path:'editflight',component:EditFlightsComponent,canActivate:[AdminGuardGuard]},{path:'AdminScheduleFlights',component:ScheduleFlightComponent,canActivate:[AdminGuardGuard]}
,{path:'search',component:SearchFlightComponent,canActivate:[UserGaurdGuard]},{path:'book/:id',component:BookFlightComponent},
{path:'ticketHistory',component:UserTicketHistoryComponent,canActivate:[UserGaurdGuard]},{path:'discount',component:DiscountComponent,canActivate:[AdminGuardGuard]},{path:'viewBooking',component:ViewBookingComponent,canActivate:[AdminGuardGuard]},{path:'viewMyTweets',component:ViewTweetsComponent,canActivate:[UserGaurdGuard]},{path:'viewalltweets',component:ViewAllTweetsComponent,canActivate:[UserGaurdGuard]}];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
