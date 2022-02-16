import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequestHelperClass } from './HelperClasses/login-request-helper-class';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { JWTResponseHelperClass } from './HelperClasses/JWTresponse-helper-class';
import { ReponseHelpeClassMaster } from './HelperClasses/reponse-helpe-class-master';
import { UserRegister } from './models/user-register-class';
import { AirLines } from './models/air-lines';
import { FlightModal } from './models/flight-modal';
import { ScheduleFlightModal } from './models/schedule-flight-modal';
import { FilghtSearchHelper } from './HelperClasses/filght-search-helper';
import { Bookinghelper } from './HelperClasses/bookinghelper';
import { DiscountMasterClass } from './models/discount-master-class';
import { Tweetdetails } from './models/tweetdetails';
import { ReplyTweetDetails } from './models/reply-tweet-details';
import { Validitytokencheck } from './models/validitytokencheck';

@Injectable({
  providedIn: 'root'
})
export class RestApiServicesService {
//private LoginURl='http://localhost:9999/api/v1.0/tweets';
private LoginURl='http://ec2-52-23-183-186.compute-1.amazonaws.com:8888/tweetapp/api/v1.0/tweets'
//private LoginURl='http://localhost:8888/tweetapp/api/v1.0/tweets'
//private authenticate='http://localhost:8888/authenticate';
private authenticate='http://ec2-52-23-183-186.compute-1.amazonaws.com:8888/authenticate';
//private validitycheck='http://localhost:8888';
private validitycheck='http://ec2-52-23-183-186.compute-1.amazonaws.com:8888';


responsedatafortoken :ReponseHelpeClassMaster=new ReponseHelpeClassMaster(false,"");

  constructor(private http:HttpClient) {
    
   }

  

   doLogin(logindata:any):Observable<ReponseHelpeClassMaster>
   {
     console.log(logindata);
       return this.http.post<ReponseHelpeClassMaster>(this.authenticate,logindata);
   }

   
   getUserDetails():Observable<ReponseHelpeClassMaster>
   {
 
    console.log( localStorage.getItem('jwttoken'));
const headers= new HttpHeaders({
  'Authorization':'cts'+localStorage.getItem('jwttoken')
});
 
       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/getuserdetailsnew',{headers});
   }


   //register data

   doRegisterUser(data:UserRegister):Observable<ReponseHelpeClassMaster>
   {
 console.log("isniide doregister api call");
 console.log(data);
   

       return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/register',data);
   }

   doAddTweet(data:Tweetdetails):Observable<ReponseHelpeClassMaster>
   {
 console.log("isniide doAddTweet api call");
 console.log(data);
   
 let headers = new Headers();
 headers.append('Authorization','cts'+localStorage.getItem('jwttoken'));
//  headers.append('Access-Control-Allow-Origin' ,'http://localhost:4201');
       return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/addTweet',data,{
        headers: new HttpHeaders({ 
          Authorization: ''+localStorage.getItem('jwttoken') 
    })
            });

      
   }

   
   doAddAirLines(data:AirLines):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside doAddAirLines api call");
 console.log(data);
   console.log('jwttoken'+localStorage.getItem('jwttoken'));
 let headers = new Headers();
 headers.append('Authorization','cts'+localStorage.getItem('jwttoken'));
//  headers.append('Access-Control-Allow-Origin' ,'http://localhost:4201');
       return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/AddAirlines',data,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }


   getAllAirLines():Observable<any>
   {
 console.log("inside getAllAirLines api call");
   console.log('jwttoken'+localStorage.getItem('jwttoken'));
       return this.http.get<any>(this.LoginURl+'/FlightBookingServices/Admin/findAllAirLines',{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }

   
   UpdateAirLines(id:string,updatedData:AirLines):Observable<any>
   {
 console.log("inside UpdateAirLines api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.post<any>(this.LoginURl+'/FlightBookingServices/Admin/updateAirlines/'+id,updatedData,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }

   deleteAirLines(id:string):Observable<any>
   {
 console.log("inside UpdateAirLines api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<any>(this.LoginURl+'/FlightBookingServices/Admin/deleteAirlines/'+id,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }


   getAllFlights():Observable<ReponseHelpeClassMaster>
   {
 console.log("inside getAllFlights api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/findAllFlights',{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }

   //adding flights to db using rest api
   SubmitFlightDetails(flightdata:FlightModal):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside SubmitFlightDetails api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/AddFlights',flightdata,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }

   DeleteFlightDetails(id:string):Observable<any>
   {
 console.log("inside DeleteFlightDetails api call"+id);

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<void>(this.LoginURl+'/FlightBookingServices/Admin/deleteFlights/'+id,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }


   updateFlightDetails(id:string,flightdata:FlightModal):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside updateFlightDetails api call"+id);

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/updateFlights/'+id,flightdata,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }


   
   getAllSceduleData():Observable<ReponseHelpeClassMaster>
   {
 console.log("inside getAllSceduleData api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/getAllScheduleFlights',{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }


   
   CancelSceduleData(id:string):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside getAllSceduleData api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/CancelSchduleFlight/'+id,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }

   //do schedule
   doAddSceduleData(data1:ScheduleFlightModal):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside doAddSceduleData api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/SchduleFlights',data1,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }

   doSearchFlights(data1:FilghtSearchHelper):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside doAddSceduleData api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/booking/SearchFlight',data1,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }



   doFlightBooking(data1:Bookinghelper):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside doAddSceduleData api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/booking/doBooking',data1,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }


   getUserTicketHistory(data1:string):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside getUserTicketHistory api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/booking/getHistory/'+data1,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }


   
   userCancelticket(data1:string):Observable<any>
   {
 console.log("inside userCancelticket api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<any>(this.LoginURl+'/FlightBookingServices/booking/pnrcancel/'+data1,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }


   getAllDiscounts():Observable<ReponseHelpeClassMaster>
   {
 console.log("inside getAllDiscounts api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/getAllDiscount',{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }



   submitDiscountData(coupondata:DiscountMasterClass):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside submitDiscountData api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/AddDiscountCoupon',coupondata,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }

   DeleteDiscountData(coupondata:DiscountMasterClass):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside submitDiscountData api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/Admin/cancelDiscount/'+coupondata.did,{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }



   
   getAllBookingHistory():Observable<ReponseHelpeClassMaster>
   {
 console.log("inside getUserTicketHistory api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/FlightBookingServices/booking/getAllBookingHistory',{
        headers: new HttpHeaders({ 
          Authorization: 'cts'+localStorage.getItem('jwttoken') 
    })
            });
   }

   getAllTweetsForUser(emailid:string):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside getAllTweetsForUser api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/getTweets/'+emailid,{
        headers: new HttpHeaders({ 
          Authorization: ''+localStorage.getItem('jwttoken') 
    })
            });
   }


   deleteTweet(tweetid:string):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside deleteTweet api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/deleteTweet/'+tweetid,{
        headers: new HttpHeaders({ 
          Authorization: ''+localStorage.getItem('jwttoken') 
    })
            });
   }

   
   getAllUsersTweets():Observable<ReponseHelpeClassMaster>
   {
 console.log("inside getAllUsersTweets api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/all/',{
        headers: new HttpHeaders({ 
          Authorization: ''+localStorage.getItem('jwttoken') 
    })
            });
   }

    
   doLikeATweet(tweetid:string):Observable<ReponseHelpeClassMaster>
   {
 console.log("inside doLikeATweet api call");

   console.log('jwttoken'+localStorage.getItem('jwttoken'));

       return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/likeTweet/'+tweetid+'/'+localStorage.getItem('userid'),{
        headers: new HttpHeaders({ 
          Authorization: ''+localStorage.getItem('jwttoken') 
    })
            });
   }


//    getAllAirlinesabcd():Observable<any>{
//     return this.http.get<any>(this.LoginURl+'airline');
// }


dislikeATweet(tweetid:string):Observable<ReponseHelpeClassMaster>
{
console.log("inside dislikeATweet api call");

console.log('jwttoken'+localStorage.getItem('jwttoken'));

    return this.http.get<ReponseHelpeClassMaster>(this.LoginURl+'/disliketweet/'+tweetid+'/'+localStorage.getItem('userid'),{
     headers: new HttpHeaders({ 
       Authorization: ''+localStorage.getItem('jwttoken') 
 })
         });
}


doReplyTweet(tweetid:string,data:ReplyTweetDetails):Observable<ReponseHelpeClassMaster>
{
console.log("inside dislikeATweet api call");

console.log('jwttoken'+localStorage.getItem('jwttoken')+'jwttoken'+localStorage.getItem('userid'));

    return this.http.post<ReponseHelpeClassMaster>(this.LoginURl+'/replyTweet/'+tweetid+'/'+localStorage.getItem('userid'),data,{
     headers: new HttpHeaders({ 
       Authorization: ''+localStorage.getItem('jwttoken') 
 })
         });
}

doCheckValidJWTtoken():Observable<ReponseHelpeClassMaster>
{
console.log("inside doCheckValidJWTtoken api call");
let checktoken:Validitytokencheck=new Validitytokencheck("","");
checktoken.token=localStorage.getItem('jwttoken');
checktoken.userid=localStorage.getItem('userid');


console.log(JSON.stringify(checktoken)+" check token in check methdo");

    return this.http.post<ReponseHelpeClassMaster>(this.validitycheck+'/validateTokenByRestApi',checktoken,{
     headers: new HttpHeaders({ 
       Authorization: ''+localStorage.getItem('jwttoken') 
 })
         });
}




doCheckValidJWTtoken1()
{
console.log("inside doCheckValidJWTtoken api call");
let checktoken:Validitytokencheck=new Validitytokencheck("","");
checktoken.token=localStorage.getItem('jwttoken');
checktoken.userid=localStorage.getItem('userid');



console.log(JSON.stringify(checktoken)+" check token in check methdo");

    return this.http.post<ReponseHelpeClassMaster>(this.validitycheck+'/validateTokenByRestApi',checktoken,{
     headers: new HttpHeaders({ 
     //  Authorization: ''+localStorage.getItem('jwttoken') 
 })
         }).subscribe((data2)=>{
          console.log(JSON.stringify(data2)+"data2data2data2");
          this.responsedatafortoken=data2;
          console.log(JSON.stringify(this.responsedatafortoken)+"this.responsedatafortoken");
         // return responsedatafortoken;
        
           });
  
      
        
}





}
