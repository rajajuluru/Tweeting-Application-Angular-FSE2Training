import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReponseHelpeClassMaster } from 'src/app/HelperClasses/reponse-helpe-class-master';
import { BookingMasterPassengerDetails } from 'src/app/models/booking-master-details';
import { BookingMasterModal } from 'src/app/models/booking-master-modal';
import { RestApiServicesService } from 'src/app/rest-api-services.service';
import jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'
@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

   downloadPDF(id:string)  
  {
    console.log("import jspdf from 'jspdf';"+id); 
     let data = document.getElementById(id)!; 
     console.log(data);
    
    const doc = new jsPDF()
    autoTable(doc, { html: '#'+id });
    doc.save('table.pdf')
  }

  constructor(private restapiService:RestApiServicesService,private routes:Router) { }
bookingMasterDetailsData:any;

getTicketsData()
{
  this.bookingMasterDetailsData=new BookingMasterPassengerDetails;
  var username=localStorage.getItem('name') as string;
  this.restapiService.getAllBookingHistory().subscribe((res:ReponseHelpeClassMaster)=>{
    console.log("after fecting in ngoint");
    console.log(res.data);
    this.bookingMasterDetailsData=res.data;
    
    console.log("after assigning the data");
    console.log(this.bookingMasterDetailsData);
        });
}
  ngOnInit(): void {

    this.getTicketsData();
  }



}


