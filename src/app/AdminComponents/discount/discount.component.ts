import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ReponseHelpeClassMaster } from 'src/app/HelperClasses/reponse-helpe-class-master';
import { DiscountMasterClass } from 'src/app/models/discount-master-class';
import { RestApiServicesService } from 'src/app/rest-api-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  AddDiscountForm=new FormGroup({});
  constructor(private restApiService:RestApiServicesService) { }
masterdiscountdata:any;
  ngOnInit(): void {
    this.AddDiscountForm=new FormGroup({
      couponcode:new FormControl('', [Validators.required]),
      couponDiscount:new FormControl('', [Validators.required,RxwebValidators.numeric()])

    });
    
  this.getAllDicountDetails();
  }
getAllDicountDetails()
{
  this.restApiService.getAllDiscounts().subscribe((res:ReponseHelpeClassMaster)=>{
    console.log("Data after feching is"+res);
    console.log(res);
this.masterdiscountdata=new Array(DiscountMasterClass);
this.masterdiscountdata=res.data;
console.log(this.masterdiscountdata);
  });
}

DeleteDiscount(editData:DiscountMasterClass){
  console.log(editData);
  this.restApiService.DeleteDiscountData(editData).subscribe((res:ReponseHelpeClassMaster)=>{
if(res.status==false)
{
  Swal.fire(res.data);
}
else
{
  this.getAllDicountDetails();
}
  });
}

  submitAddForm()
  {
    let discountclassObj=new DiscountMasterClass;
    if(this.AddDiscountForm.valid)
    {

      if(this.AddDiscountForm.controls.couponDiscount.value>0 && this.AddDiscountForm.controls.couponDiscount.value<99)
      {
        discountclassObj=this.AddDiscountForm.value;
        console.log("discountclassObj"+discountclassObj);
        this.restApiService.submitDiscountData(discountclassObj).subscribe((res:ReponseHelpeClassMaster)=>{
         console.log(res);
         document.getElementById("close")?.click;
         this.getAllDicountDetails();
        });
      }
      else{
        
        Swal.fire("Discount should be greater than zero and less than 99");
      }
    }else{

    }
  }

}
