import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookinghelper } from 'src/app/HelperClasses/bookinghelper';
import { ReponseHelpeClassMaster } from 'src/app/HelperClasses/reponse-helpe-class-master';
import { ScheduleFlightModal } from 'src/app/models/schedule-flight-modal';
import { RestApiServicesService } from 'src/app/rest-api-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  
  constructor(private activaterouter:ActivatedRoute,private fb:FormBuilder,private apiservices:RestApiServicesService,private router:Router) { }
paramid:any;
localstoragebookingdata!:ScheduleFlightModal;
dobookingForm!: FormGroup;

newpassengerDetailsForm(): FormGroup {
  return this.fb.group({
    name:new FormControl('',Validators.required),
    age:new FormControl('',Validators.required),
   gender:new FormControl('',Validators.required)
   
  })
}



addPassengerForm() {
  let formarray:FormArray;
    formarray=this.dobookingForm.get("detailsOfPassenger") as FormArray;
   formarray.push(this.newpassengerDetailsForm());
}

get  getpassengerdetailsform() : FormArray {
  return this.dobookingForm.get("detailsOfPassenger") as FormArray
}
 

deletePassengerForm(i:number) {
  this.getpassengerdetailsform.removeAt(i);

}
  ngOnInit(): void {
    
    this.paramid=this.activaterouter.snapshot.paramMap.get('id');
    this.localstoragebookingdata=JSON.parse(localStorage.getItem(this.paramid) as string);
    this.dobookingForm=this.fb.group({
        couponcode!:new FormControl(''),
    //   scheduleflightId:new FormControl(),
	  //   seatnos:new FormControl(),
    //   flightId:new FormControl(),
    // userid:new FormControl(),
    detailsOfPassenger:this.fb.array(
        [
        //   {
        //     name:new FormControl("sample data"),
        //      age:new FormControl(),
	      //     gender:new FormControl()
        // }
    ])

    });
  }

  bookinghelper=new Bookinghelper;
//do booking
doBooking(id:string)
{
  console.log(this.dobookingForm);
  this.localstoragebookingdata=JSON.parse(localStorage.getItem(id) as string);
  console.log(this.dobookingForm.get('detailsOfPassenger')?.value);
 
this.bookinghelper.detailsOfPassenger=this.dobookingForm.get('detailsOfPassenger')?.value;
this.bookinghelper.flightId=this.localstoragebookingdata.flightId;
this.bookinghelper.scheduleflightId=this.localstoragebookingdata.schduleId;
this.bookinghelper.seatnos=this.getpassengerdetailsform.length;
this.bookinghelper.userid=localStorage.getItem("name") as string;
this.bookinghelper.discountCode=this.dobookingForm.controls.couponcode.value;
console.log(this.bookinghelper);

console.log(this.dobookingForm.get('detailsOfPassenger')?.valid);

if(this.dobookingForm.get('detailsOfPassenger')?.valid)
{
this.apiservices.doFlightBooking(this.bookinghelper).subscribe((res:ReponseHelpeClassMaster)=>{
  console.log("After fetching from rest");
  console.log(res);
  console.log(res.data);
  if(res.status)
  {
    Swal.fire("successfully booked a ticket PNR numbers are "+JSON.stringify(res.data) as string);
this.router.navigate(['/search']);
  }
  else
  {
    Swal.fire(res.data);
  }
});
}
else{
  Swal.fire("fill all details to book a ticket");
}

  

}

}
