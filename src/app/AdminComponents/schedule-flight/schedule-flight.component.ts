import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PickerInteractionMode } from 'igniteui-angular';
import { ReponseHelpeClassMaster } from 'src/app/HelperClasses/reponse-helpe-class-master';
import { ScheduleFlightModal } from 'src/app/models/schedule-flight-modal';
import { RestApiServicesService } from 'src/app/rest-api-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule-flight',
  templateUrl: './schedule-flight.component.html',
  styleUrls: ['./schedule-flight.component.css']
})
export class ScheduleFlightComponent implements OnInit {
  // public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
  // public format = 'hh:mm tt';
  // public date: Date = new Date();

 
  constructor(private restapiservice:RestApiServicesService) { }
  flightmodal:any;
  
  ScheduleFlightModalArray:ScheduleFlightModal[]=[];



  
AddscheduleForm=new FormGroup({



});

deleteSchedule(id:string)
{
  //alert(id);

  this.restapiservice.CancelSceduleData(id).subscribe((res:ReponseHelpeClassMaster)=>{
console.log(res);
    let data=res.data;
    Swal.fire(data);
    this.getAllScheduleData();
  });
  
}
  ngOnInit(): void {
    

   
    this.AddscheduleForm=new FormGroup({

      flightId:new FormControl('',Validators.required),
      journeyDate:new FormControl('',Validators.required),
      onBoradingTime:new FormControl('',Validators.required),
      departureTime:new FormControl('',Validators.required),
      bookingStartDate:new FormControl('',Validators.required),
      bookingEndDate:new FormControl('',Validators.required)
      //schduleId!:string;
    
    });

    this.getAllScheduleData();
    
  }


  getAllScheduleData()
  {
    
    this.restapiservice.getAllSceduleData().subscribe((res:ReponseHelpeClassMaster)=>{
      console.log(res);
      this.ScheduleFlightModalArray=res.data;
      console.log("after feching data");
      console.log(this.ScheduleFlightModalArray);
      this.getAllFLightsMethod();
      
          });
  }
  getAllFLightsMethod()
  {
    this.restapiservice.getAllFlights().subscribe((res:any)=>{
      console.log("in onint of flight component");
      console.log(res);
      this.flightmodal=res.data;
      console.log("aftr feching data");
      console.log(this.flightmodal);
      
    });
  }

  addSchedulesubmitform()
  {
    console.log(this.AddscheduleForm.value);

//     let pipe=new DatePipe('en-US');
//     try
//     {
// let valueafter=pipe.transform(this.AddscheduleForm.controls.bookingStartDate.value,'yyyy-mm-dd');
// console.log(valueafter+"value garegfgha");
//     }
//     catch{
      
//     }
this.restapiservice.doAddSceduleData(this.AddscheduleForm.value).subscribe((res:ReponseHelpeClassMaster)=>{
console.log("doAddSceduleData fetch after"+res.data);
document.getElementById("close")?.click();
  this.getAllScheduleData();
});


}

}
