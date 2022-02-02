import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReponseHelpeClassMaster } from 'src/app/HelperClasses/reponse-helpe-class-master';
import { AirLines } from 'src/app/models/air-lines';
import { FlightModal } from 'src/app/models/flight-modal';
import { RestApiServicesService } from 'src/app/rest-api-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  arrayAirlineData:any=new Array(AirLines);
  filteredAirLinedata:any;

  //flightmodal=new Array(FlightModal);
  flightmodal:any;
  constructor(private RestapiService:RestApiServicesService,private routes:Router) { }
  addFlightsForm=new FormGroup({});
  ngOnInit(): void {
    this.addFlightsForm=new FormGroup({
      fromLocation:new FormControl('',Validators.required),
      toLocation:new FormControl('',Validators.required),
      seatsCount:new FormControl('',Validators.required),
      remarks:new FormControl(),
      lockstatus:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      airLineId:new FormControl('',Validators.required)
    });
   this.getAllFLightsMethod();

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
  }//ngonit ends

  getAllFLightsMethod()
  {
    this.RestapiService.getAllFlights().subscribe((res:any)=>{
      console.log("in onint of flight component");
      console.log(res);
      this.flightmodal=res.data;
      console.log("aftr feching data");
      console.log(this.flightmodal);
      
    });
  }
  SubmitFlightDetails()
  {
    //alert("addFlight");
    console.log("form data is");
    console.log(this.addFlightsForm);
    let addFlightData=new FlightModal();
    addFlightData=this.addFlightsForm.value;
   
    console.log("after assigning the data to addflight data");
    console.log(addFlightData);
if(this.addFlightsForm.valid && this.addFlightsForm.controls.price.value>0)
{
    this.RestapiService.SubmitFlightDetails(addFlightData).subscribe((response:ReponseHelpeClassMaster)=>{
      console.log("after rest api call");
      console.log(response.status);
      console.log(response.data);

      if(response.status)
      {
Swal.fire("Successfully submitted data");
document.getElementById("close")?.click();
      }
      else{
Swal.fire("something went wrong");
      }

      this.getAllFLightsMethod();
    });
    

  }
  else if(this.addFlightsForm.controls.price.value==0 || this.addFlightsForm.controls.price.value<0){
    Swal.fire("price should be greater than zero");
    
  }
  else if(this.addFlightsForm.invalid)
  {
    Swal.fire("Enter All fields to submit details");
  }
    

  }


  deleteFlightId(id:string)
  {
    console.log("deleteFlightId       "+id)
    this.RestapiService.DeleteFlightDetails(id).subscribe(()=>{
      this.getAllFLightsMethod();
    });
    
  }

  EditFlightDetails(itemdata:FlightModal)
  {
    console.log(itemdata);
    localStorage.setItem("editflight",JSON.stringify(itemdata));
    this.routes.navigate(['/editflight']);
    
  }


}
