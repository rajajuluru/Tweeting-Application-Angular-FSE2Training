import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirLines } from 'src/app/models/air-lines';
import { FlightModal } from 'src/app/models/flight-modal';
import { RestApiServicesService } from 'src/app/rest-api-services.service';

@Component({
  selector: 'app-edit-flights',
  templateUrl: './edit-flights.component.html',
  styleUrls: ['./edit-flights.component.css']
})
export class EditFlightsComponent implements OnInit {
  updatedata!:FlightModal;
  
  parseflightmodal!:FlightModal;
addFlightsForm=new FormGroup({});
  constructor(private RestapiService:RestApiServicesService,private routes:Router) { }
  filteredAirLinedata:any;
  arrayAirlineData:any=new Array(AirLines);
  ngOnInit(): void {
 const localdata=localStorage.getItem("editflight") as string;
 this.RestapiService.getAllAirLines().subscribe((res:any)=>
 {
  this.arrayAirlineData= res.data;
  console.log(res.data+"res.data");
  console.log(this.arrayAirlineData);
 console.log("after fetching airline data filter it");
  this.filteredAirLinedata=this.arrayAirlineData.filter((s:AirLines)=>  s.lockStatus==0);
 console.log("after filtering");
 console.log(this.filteredAirLinedata);
 });

try {
  this.parseflightmodal=JSON.parse(localdata);
  console.log(this.parseflightmodal);
  this.addFlightsForm=new FormGroup({
    fromLocation:new FormControl(this.parseflightmodal.fromLocation,Validators.required),
    toLocation:new FormControl(this.parseflightmodal.toLocation,Validators.required),
    seatsCount:new FormControl(this.parseflightmodal.seatsCount,Validators.required),
    remarks:new FormControl(),
    lockstatus:new FormControl(this.parseflightmodal.lockstatus,Validators.required),
    price:new FormControl(this.parseflightmodal.price,Validators.required),
    airLineId:new FormControl(this.parseflightmodal.airLineId,Validators.required),
    flightID:new FormControl(this.parseflightmodal.flightID)
  });
} catch (error) {
  console.log(error+"error");
}
  }


  
  updateFlightDetails()
  {
    console.log(this.addFlightsForm.value);

    this.updatedata=this.addFlightsForm.value;
this.RestapiService.updateFlightDetails(this.updatedata.flightID,this.updatedata).subscribe((res:any)=>{
console.log("after fetchiing data");
  console.log(res.data);
  this.routes.navigate(['/AdminFlights']);
})

  }

  

}
