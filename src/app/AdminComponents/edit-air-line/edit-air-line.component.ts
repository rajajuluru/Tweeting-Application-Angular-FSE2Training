import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from 'rxjs';
import { AirLines } from 'src/app/models/air-lines';
import { RestApiServicesService } from 'src/app/rest-api-services.service';

@Component({
  selector: 'app-edit-air-line',
  templateUrl: './edit-air-line.component.html',
  styleUrls: ['./edit-air-line.component.css']
})
export class EditAirLineComponent implements OnInit {

   EditAirLineData:AirLines=new AirLines('','','',new Date(),'',1);
  constructor(    private route: ActivatedRoute,private RestapiService:RestApiServicesService,private router:Router) { }
dataString:string="";

UpdateAirLineForm=new FormGroup({});
  ngOnInit(): void {
    
    this.dataString = this.route.snapshot.params['id'];
    this.dataString=localStorage.getItem(this.dataString) as string;
    console.log("in edit component");
    console.log(this.dataString);
    this.EditAirLineData=JSON.parse(this.dataString);
    console.log(this.EditAirLineData);
    this.UpdateAirLineForm=new FormGroup({
      updateAirId:new FormControl(this.EditAirLineData.airLineId,Validators.required),
      updateName:new FormControl(this.EditAirLineData.airLineName,Validators.required),
      updateDesc:new FormControl(this.EditAirLineData.airLineDescription,Validators.required)
      ,updateStatus:new FormControl(this.EditAirLineData.lockStatus,Validators.required)
    });
  }
  updateAirLines()
  {
    console.log(this.UpdateAirLineForm);
    console.log(this.UpdateAirLineForm.controls.updateAirId.value);
    this.EditAirLineData.airLineDescription=this.UpdateAirLineForm.controls.updateDesc.value;
    this.EditAirLineData.airLineName=this.UpdateAirLineForm.controls.updateName.value;
    this.EditAirLineData.lockStatus=this.UpdateAirLineForm.controls.updateStatus.value;
    console.log("after assigning data");
    console.log(this.EditAirLineData);
     this.RestapiService.UpdateAirLines(this.UpdateAirLineForm.controls.updateAirId.value,this.EditAirLineData).subscribe(resp=>{
console.log(resp);
localStorage.removeItem(this.dataString);
this.router.navigate(['/AdminAirlines']);
    });
  }


}



