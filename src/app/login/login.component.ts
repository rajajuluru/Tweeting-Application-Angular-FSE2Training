import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { JWTResponseHelperClass } from '../HelperClasses/JWTresponse-helper-class';
import { LoginRequestHelperClass } from '../HelperClasses/login-request-helper-class';
import { ReponseHelpeClassMaster } from '../HelperClasses/reponse-helpe-class-master';
import { UserDeatilsClass } from '../models/user-deatils-class';
import { RestApiServicesService } from '../rest-api-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role:any;
  name:any;
  loginform =new FormGroup({});

  LoginResponseHelperClass=new JWTResponseHelperClass(false,"");;
  UserDeatialsResponseClass=new ReponseHelpeClassMaster(false,"");
  public loginhelperclass:LoginRequestHelperClass=new LoginRequestHelperClass("","");  
  public res:ReponseHelpeClassMaster =new ReponseHelpeClassMaster(false,"");
  public userdetalsmodel:UserDeatilsClass=new UserDeatilsClass("","");
  onloginsubmit()
  {

if(this.loginform.valid)
{


this.loginhelperclass=new LoginRequestHelperClass(this.loginform.value.emaildata,this.loginform.value.password);
const login = {
  username: this.loginhelperclass.username,
  password:this.loginhelperclass.password
};
console.log('customized object login'+login);
this.apiServices.doLogin(login).subscribe((data)=>
{
  console.log(JSON.stringify(data)+"json string ");
  this.res=data;
  console.log("after post method");
console.log(this.res);
if(this.res.status)
{
  this.router.navigate(['/home'], { relativeTo: this.route })
  Swal.fire(this.res.data);
   localStorage.setItem('jwttoken','cts'+this.res.data );
   localStorage.setItem('userid',login.username);
  Swal.fire("successfully logged in");
   console.log(localStorage.getItem('jwttoken')+"jwt token in local storage");

}
else
{
Swal.fire(this.res.data);
}

});


}
else{
Swal.fire("please fill all necessary data");
}

  }
  constructor(private apiServices:RestApiServicesService,private router:Router,private route: ActivatedRoute) { }

  get form() { 
    return this.loginform.controls; 
  }
  loginStatus:boolean=false;
  ngOnInit(): void {

    // if(localStorage.getItem('role')!=null || localStorage.getItem('role')!=undefined || localStorage.getItem('jwttoken')!=null || localStorage.getItem('jwttoken')!=undefined || localStorage.getItem('name')!=null || localStorage.getItem('name')!=undefined)
    // {
    //   this.loginStatus=true;
    // }
    // else{
    //    this.loginStatus=false;
    // }
    this.loginform = new FormGroup({
      emaildata: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required)
    });

  }

  onRegister()
  {

    this.router.navigate(['/register']);
  }

}
