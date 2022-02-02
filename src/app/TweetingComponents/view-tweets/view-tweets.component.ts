import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplyTweetDetails } from 'src/app/models/reply-tweet-details';
import { Tweetdetails } from 'src/app/models/tweetdetails';
import { UserRegister } from 'src/app/models/user-register-class';
import { RestApiServicesService } from 'src/app/rest-api-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-tweets',
  templateUrl: './view-tweets.component.html',
  styleUrls: ['./view-tweets.component.css']
})
export class ViewTweetsComponent implements OnInit {

  tweetdetailsforUser:Tweetdetails[] = [];
  likedusersdata:UserRegister[][]=[];
  tweetid:string="";
  replieduserArray:ReplyTweetDetails[][]=[];
  constructor(private restServices:RestApiServicesService,private router:Router) { }


  deleteTweet(tweetidfromhtml:string){
    this.restServices.deleteTweet(tweetidfromhtml).subscribe((data4)=>{
      //this.router.snapshot.paramMap.get('');
      this.router.navigate(['/home']);
    
    });


  }

  likesdata(tweetidfromhtml:string) {
    // Swal.fire("tweetidfromhtml               "+tweetidfromhtml);
  
 
    this.likedusersdata= this.tweetdetailsforUser.filter((data, index)=>{
      console.log(data.tweetId+"tweetid"+"   tweetidfromhtml"+tweetidfromhtml);
      return data.tweetId==tweetidfromhtml;
     }).map((z12,index)=>{
       return z12.likedUsersList;
     });
    }
  modalupdatehelper(tweetidfromhtml:string) {
   // Swal.fire("tweetidfromhtml               "+tweetidfromhtml);
 

   this.replieduserArray= this.tweetdetailsforUser.filter((data, index)=>{
     console.log(data.tweetId+"tweetid"+"   tweetidfromhtml"+tweetidfromhtml);
     return data.tweetId==tweetidfromhtml;
    }).map((z1,index)=>{
      return z1.repliedUsersList;
    });

  

    console.log(JSON.stringify(this.replieduserArray)+"replieduserArrayreplieduserArray");
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('userid')+"localStorage.getItem('userid')");
    this.restServices.getAllTweetsForUser(''+localStorage.getItem('userid')).subscribe(zz=>{

      console.log(JSON.stringify(zz)+"from service zz");
      this.tweetdetailsforUser=zz.data;
      
      console.log(JSON.stringify(this.tweetdetailsforUser)+"after assigning the data");


    });

  }

}
