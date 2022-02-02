import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ErrorHandler } from "@angular/core";

import { UnauthorizedComponent } from './GlobalComponents/unauthorized/unauthorized.component';
import { AirLinesComponent } from './AdminComponents/air-lines/air-lines.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { EditAirLineComponent } from './AdminComponents/edit-air-line/edit-air-line.component'; 
import { AirLines } from './models/air-lines';
import { LogoutComponent } from './GlobalComponents/logout/logout.component';
import { HeaderComponent } from './HtmlComponents/header/header.component';
import { FlightsComponent } from './AdminComponents/flights/flights.component';
import { CustomeErrorHandler } from './HelperClasses/error-handler';
import { EditFlightsComponent } from './AdminComponents/edit-flights/edit-flights.component';
import { ScheduleFlightComponent } from './AdminComponents/schedule-flight/schedule-flight.component';
import { 
	IgxTimePickerModule,
	IgxInputGroupModule,
	IgxIconModule
 } from "igniteui-angular";
import { SearchFlightComponent } from './UserComponents/search-flight/search-flight.component';
import { BookFlightComponent } from './UserComponents/book-flight/book-flight.component';
import { UserTicketHistoryComponent } from './UserComponents/user-ticket-history/user-ticket-history.component';
import { DiscountComponent } from './AdminComponents/discount/discount.component';
import { EditDiscountComponent } from './AdminComponents/edit-discount/edit-discount.component';
import { ViewBookingComponent } from './AdminComponents/view-booking/view-booking.component';
import { FooterComponent } from './HtmlComponents/footer/footer.component';
import { AddTweetComponent } from './TweetingComponents/add-tweet/add-tweet.component';
import { ViewTweetsComponent } from './TweetingComponents/view-tweets/view-tweets.component';
import { ViewAllTweetsComponent } from './TweetingComponents/view-all-tweets/view-all-tweets.component';

 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
   
    UnauthorizedComponent,
    AirLinesComponent,
    EditAirLineComponent,
    LogoutComponent,
    HeaderComponent,
    FlightsComponent,
    EditFlightsComponent,
    ScheduleFlightComponent,
    SearchFlightComponent,
    BookFlightComponent,
    UserTicketHistoryComponent,
    DiscountComponent,
    EditDiscountComponent,
    ViewBookingComponent,
    FooterComponent,
    AddTweetComponent,
    ViewTweetsComponent,
    ViewAllTweetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule,FormsModule,RxReactiveFormsModule,	IgxTimePickerModule,
    IgxInputGroupModule,
    IgxIconModule
  ],
  providers: [{provide: ErrorHandler, useClass: CustomeErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
