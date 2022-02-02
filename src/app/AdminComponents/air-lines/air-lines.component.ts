import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {RxwebValidators } from "@rxweb/reactive-form-validators";
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
import { AirLines } from 'src/app/models/air-lines';
import { RestApiServicesService } from 'src/app/rest-api-services.service';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';



@Component({
  selector: 'app-air-lines',
  templateUrl: './air-lines.component.html',
  styleUrls: ['./air-lines.component.css']
})
export class AirLinesComponent implements OnInit {
  airLines:AirLines=new AirLines("","","",new Date(),"",1);
  arrayAirLines:AirLines[]=[];
  AirLineAddForm=new FormGroup({});


  constructor(private restapiservice:RestApiServicesService,private routes:Router,  private Actroute: ActivatedRoute,) { }
 

  ngOnInit(): void {

   console.log("init method");
    this.AirLineAddForm = new FormGroup({
      addName: new FormControl('', [Validators.required]),
      addDesc: new FormControl('', [Validators.required]),
      addStatus: new FormControl('', [Validators.required])
      
  });

  this.getAirLines();


  }

getAirLines()
{
  this.restapiservice.getAllAirLines().subscribe((res:any)=>{
    console.log("in oninit function api call");
console.log(res.status);
this.arrayAirLines=res.data;
console.log(res);
console.log("after call");
console.log(this.arrayAirLines);

  });
}


  modalupdatehelper(data1:AirLines){
    console.log(data1);
localStorage.setItem(data1.airLineId,JSON.stringify(data1)); 
    this.routes.navigate(['/editAirLine',data1.airLineId], { relativeTo: this.Actroute })
    

  
  }
//deleting airlines
  deleteAirLine(id:string)
  {
    this.restapiservice.deleteAirLines(id).subscribe((data)=>{
      this.getAirLines();
    }
    );
   
  }
  //add airlines
  onAddAirlines()
  {
         
    console.log(this.AirLineAddForm.controls.addName.status);
    console.log(this.AirLineAddForm.status);
    this.airLines.airLineDescription=this.AirLineAddForm.controls.addDesc.value;
    this.airLines.airLineName=this.AirLineAddForm.controls.addName.value;
    this.airLines.lockStatus=this.AirLineAddForm.controls.addStatus.value;
    console.log("after adding to airline object");
    console.log(this.airLines);
    if(this.AirLineAddForm.valid){
    this.restapiservice.doAddAirLines(this.airLines).subscribe((res:any)=>{
      console.log("after getting data using rest call");
      console.log(res);
      console.log(res.status);
   
      document.getElementById("close")?.click();
      this.getAirLines();

    });
  }
  else{
    console.log("else");
  }
  }
}
