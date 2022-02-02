import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilghtSearchHelper } from 'src/app/HelperClasses/filght-search-helper';
import { ReponseHelpeClassMaster } from 'src/app/HelperClasses/reponse-helpe-class-master';
import { ScheduleFlightModal } from 'src/app/models/schedule-flight-modal';
import { RestApiServicesService } from 'src/app/rest-api-services.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
searchFlightForm=new FormGroup({});
  constructor(private apiservices:RestApiServicesService,private router:Router) { }
  flightsearchData: FilghtSearchHelper = new FilghtSearchHelper;
   ArrayscheduleFlightModaldata:any
  ngOnInit(): void {
    this.ArrayscheduleFlightModaldata=new Array(ScheduleFlightModal);
    this.searchFlightForm=new FormGroup({
      source:new FormControl('',Validators.required),
      destination:new FormControl('',Validators.required),
      journey:new FormControl('',Validators.required),
    });
  }

  searchFlights()
  {

    console.log(this.searchFlightForm.value);
   this.flightsearchData=this.searchFlightForm.value;
    this.apiservices.doSearchFlights(this.flightsearchData).subscribe((res:ReponseHelpeClassMaster)=>{
     this.ArrayscheduleFlightModaldata= res.data;
     console.log("after fetching");
     console.log(this.ArrayscheduleFlightModaldata);
    });


  }

  detailsbookticket(bookscheduleid:ScheduleFlightModal){
    console.log(bookscheduleid);
    localStorage.setItem(bookscheduleid.flightId,JSON.stringify(bookscheduleid));
    this.router.navigate(['/book/'+bookscheduleid.flightId]);
  }
}
