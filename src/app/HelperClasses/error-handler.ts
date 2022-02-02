import {ErrorHandler, Injectable} from "@angular/core";
import Swal from "sweetalert2";
import {  Router } from '@angular/router';
import { json } from "@rxweb/reactive-form-validators";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
  })
export class CustomeErrorHandler implements ErrorHandler{
  constructor(public router:Router){}
    
    handleError(err:HttpErrorResponse){
        console.log(err.status)
        
        if(err.status==403)
         {
          Swal.fire(err.error.data);   
          Swal.fire("UnAuthorized Access of Resources");
          this.router.navigate(['/logoutss']);

        }

        if(err.status==500)
        {
          Swal.fire(err.error.data);
          
          
        }
        console.log(err.status+"statusss");

    }
}


