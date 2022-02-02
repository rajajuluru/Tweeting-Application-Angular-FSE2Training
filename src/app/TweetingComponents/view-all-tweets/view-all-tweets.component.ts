import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplyTweetDetails } from 'src/app/models/reply-tweet-details';
import { Tweetdetails } from 'src/app/models/tweetdetails';
import { UserRegister } from 'src/app/models/user-register-class';
import { RestApiServicesService } from 'src/app/rest-api-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-tweets',
  templateUrl: './view-all-tweets.component.html',
  styleUrls: ['./view-all-tweets.component.css']
})
export class ViewAllTweetsComponent implements OnInit {

  tweetdetails:Tweetdetails[] = [];
  replieduserArray:ReplyTweetDetails[][]=[];
  vartweetidforreply:string="";
  element!: HTMLInputElement;

  replytweettoreply:ReplyTweetDetails=new ReplyTweetDetails;

  likedusersdata:UserRegister[][]=[];
  constructor(private restServices:RestApiServicesService,private router:Router) { }

  ngOnInit(): void {
    this.fetchdetails();

  }


  fetchdetails(){
    this.restServices.getAllUsersTweets().subscribe((data5)=>{
      console.log(JSON.stringify(data5)+"JSON.stringify(data5)");
      this.tweetdetails = data5.data;
      
      });
  }

  modalupdatehelper(tweetidfromhtml:string) {
    // Swal.fire("tweetidfromhtml               "+tweetidfromhtml);
  
 
    this.replieduserArray= this.tweetdetails.filter((data, index)=>{
      console.log(data.tweetId+"tweetid"+"   tweetidfromhtml"+tweetidfromhtml);
      return data.tweetId==tweetidfromhtml;
     }).map((z1,index)=>{
       return z1.repliedUsersList;
     });
    }
    likesdata(tweetidfromhtml:string) {
      // Swal.fire("tweetidfromhtml               "+tweetidfromhtml);
    
   
      this.likedusersdata= this.tweetdetails.filter((data, index)=>{
        console.log(data.tweetId+"tweetid"+"   tweetidfromhtml"+tweetidfromhtml);
        return data.tweetId==tweetidfromhtml;
       }).map((z1,index)=>{
         return z1.likedUsersList;
       });
      }

      getLocalStorageItems() {
        console.log(localStorage.getItem("userid")+"localStorage.getItem");
      return localStorage.getItem("userid");
      }


      newfindlikeornotfunction(tweetidfromhtml:string):any {
       try {
         
        for (let i = 0; i < this.tweetdetails.length; i++) {
          console.log(this.tweetdetails[i]+"tweetdetailstweetdetails");
          if(this.tweetdetails[i].tweetId==tweetidfromhtml)
          {
            try {
              for(let j=0;j<this.tweetdetails[i].likedUsersList.length;j++)
            {
              if(this.tweetdetails[i].likedUsersList[j].email==localStorage.getItem("userid"))
              {
                return true;
              }else
              {
                return false;
              }
            }
              
            } catch (error) {
              console.log(error+"inside catch");

              return false;
              
            }
          }
        }
       } catch (error) {
        console.log(error+"outside catch");
              
         return false;
       }

      }
      dolike(tweetidfromhtml:string){
      
        this.restServices.doLikeATweet(tweetidfromhtml).subscribe(()=>{

          this.fetchdetails();

        });

      }


      dislike(tweetidfromhtml:string){
      
        this.restServices.dislikeATweet(tweetidfromhtml).subscribe(()=>{

          this.fetchdetails();

        });

      }


      getTweetIdForReply(tweetidforreply:string){
      
        this.vartweetidforreply=tweetidforreply;
      }

      
      submitReplyTweet(){
        this.element=(<HTMLInputElement>document.getElementById("tweetmessage"));

        console.log(this.element.value+"value emelemt");
        console.log((<HTMLInputElement>document.getElementById("tweetidforreply")).value+"       tweetidforreply");
        this.replytweettoreply.message=(<HTMLInputElement>document.getElementById("tweetmessage")).value;
        this.replytweettoreply.userEmail=localStorage.getItem('userid')+'';
        console.log(JSON.stringify(this.replytweettoreply)+"this.replytweettoreply");

        this.restServices.doReplyTweet((<HTMLInputElement>document.getElementById("tweetidforreply")).value,this.replytweettoreply).subscribe((data)=>{
          console.log(JSON.stringify(data)+"data from server");
         // document.getElementById("closetweetreply")?.click;
         (<HTMLInputElement>document.getElementById("closetweetreply")).click;

          this.fetchdetails();

        });


      }

}
