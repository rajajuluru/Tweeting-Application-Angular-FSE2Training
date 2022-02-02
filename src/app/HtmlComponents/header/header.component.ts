import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirLines } from 'src/app/models/air-lines';
import { RestApiServicesService } from 'src/app/rest-api-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginStatus:boolean=false;
  constructor(private router: Router) { }
  role:any;
  name:any;

  //,private restapi:RestApiServicesService
 
  ngOnInit(): void {
    
   
    console.log("app component");
    this.name=localStorage.getItem('userid');
    
    console.log("header component"+this.name);
 



    if(localStorage.getItem('name')!=null || localStorage.getItem('name')!=undefined || localStorage.getItem('jwttoken')!=null || localStorage.getItem('jwttoken')!=undefined)
    {
      console.log("app component if" );
    //  this.role=localStorage.getItem('role');
     // this.name=localStorage.getItem('name');
      this.loginStatus=true;
      console.log(this.name+"this .name");
    }
    else{
      console.log("app component else");
       this.loginStatus=false;
    }
  }

}
