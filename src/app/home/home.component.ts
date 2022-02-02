import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
   // window.location.reload();
   }

  loginStatus:boolean=false;
  ngOnInit(): void {
    console.log(localStorage.getItem('userid')+"localStorage.getItem('userid')");
    
    if(localStorage.getItem('userid')!=null || localStorage.getItem('jwttoken')!=null || localStorage.getItem('jwttoken')!=undefined)
    {
      this.loginStatus=true;
    }
    else{
       this.loginStatus=false;
    }

  }

}
