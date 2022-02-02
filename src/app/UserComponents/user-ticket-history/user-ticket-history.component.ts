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
  selector: 'app-user-ticket-history',
  templateUrl: './user-ticket-history.component.html',
  styleUrls: ['./user-ticket-history.component.css']
})
export class UserTicketHistoryComponent implements OnInit {

   downloadPDF(id:string)  
  {
    console.log("import jspdf from 'jspdf';"+id); 
     let data = document.getElementById(id)!; 
     console.log(data);
    // html2canvas(data).then(canvas => {  
       
    //   let imgWidth = 208;   
    //   let pageHeight = 295;    
    //   let imgHeight = canvas.height * imgWidth / canvas.width;  
    //   let heightLeft = imgHeight;  

    //   let pdf = new jspdf('p', 'mm', 'a4');  
    //   let position = 0;  
    
    //  pdf.text(data.innerHTML,pageHeight,pageHeight);
    //   pdf.save('myTicket.pdf');  
    // });  
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
  this.restapiService.getUserTicketHistory(username).subscribe((res:ReponseHelpeClassMaster)=>{
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


  calcelTicket(canceldata:BookingMasterPassengerDetails)
  {
    console.log(canceldata+"cancel data recieved");
    this.restapiService.userCancelticket(canceldata.booking_group_Id).subscribe((res:any)=>{
      console.log(res);
      //this.getTicketsData();
      //this.routes.navigate(['/ticketHistory']);
    });
    this.getTicketsData();
  }
}
