
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Flight-Booking-Application';
 
  constructor(private injector: Injector) { }

  ngOnInit() {
  
  }
 

}
