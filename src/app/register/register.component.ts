import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from '../models/user-register-class';
import { RestApiServicesService } from '../rest-api-services.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ReponseHelpeClassMaster } from '../HelperClasses/reponse-helpe-class-master';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userdata!: UserRegister;
  res!:ReponseHelpeClassMaster;
  

  
  registerform =new FormGroup({});

  constructor(private service:RestApiServicesService,private router:Router) { }

  ngOnInit(): void {
    console.log("register form");
    this.registerform = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required, Validators.pattern("[A-Za-z0-9._]+@[a-z0-9.]+\\.[a-z]{2,3}")]),
      password: new FormControl('',Validators.required),
      mobilenumber: new FormControl('',[Validators.required])
    });
  }

  
  onregister()
  {
    
    console.log(this.registerform.value);
this.userdata=this.registerform.value;
console.log("userdetails class data");
console.log(this.userdata);
 this.service.doRegisterUser(this.userdata).subscribe((data)=>{
  
   console.log("after api call data is received is");
   console.log(data);
   this.res=data;
   console.log("after assigning data to response helper class");
   console.log(this.res+"              res");

   if(this.res.status===true)
   {
    this.router.navigate(['/login']);
   }else{
     Swal.fire(this.res.data);
   }

 })

  }
}
