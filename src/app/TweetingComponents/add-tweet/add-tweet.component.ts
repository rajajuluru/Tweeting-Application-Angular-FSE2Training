import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReponseHelpeClassMaster } from 'src/app/HelperClasses/reponse-helpe-class-master';
import { Tweetdetails } from 'src/app/models/tweetdetails';
import { RestApiServicesService } from 'src/app/rest-api-services.service';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.css']
})
export class AddTweetComponent implements OnInit {

  
  addTweetForm =new FormGroup({});
  taguserdata!:string;
  taguserArray!:string[];
  tweetdata:Tweetdetails=new Tweetdetails();
  dummyarray: string[] = [];
  res!:ReponseHelpeClassMaster;
  
  constructor(private restServices:RestApiServicesService,private router:Router) { }

  ngOnInit(): void {

    this.addTweetForm = new FormGroup({
      message: new FormControl('',[Validators.required]),
      tag: new FormControl('',Validators.required),
   
    });
   
  }

doAddTweetApiCall(): void {
  this.restServices.doAddTweet(this.tweetdata).subscribe((data)=>{
    console.log(JSON.stringify(this.tweetdata)+"in doAddTweetApiCall condition");
    this.res=data;
    console.log(JSON.stringify(this.res)+"res info from server");
    this.router.navigate(['/viewMyTweets']);
   });
}

  
  onTweetSubmit(){
      console.log(JSON.stringify(this.addTweetForm.value)+"values im addTweetForm");
    
      this.taguserdata=this.addTweetForm.controls['tag'].value;
      console.log(this.taguserdata+"tag user data");

      this.tweetdata=this.addTweetForm.value;
      this.tweetdata.userEmail=''+localStorage.getItem('userid');
      console.log(this.taguserdata+"tweet details after getting uderid from local storage");
      
      try {
        
      if(this.taguserdata==null || this.taguserdata=='' )
      {

        console.log('in null condition');
        this.taguserArray=[];
        this.doAddTweetApiCall();
      }
      else{ 
        if(this.taguserdata.includes(','))
        {
           this.taguserArray=this.taguserdata.split(',');
           this.tweetdata.tagUsers=this.taguserArray;
           console.log(JSON.stringify(this.tweetdata)+"in includes condition");
           this.doAddTweetApiCall();
           this.taguserArray=[];
          
        }
        else
        {
          this.dummyarray=[];
          this.dummyarray.push(this.taguserdata);
          this.tweetdata.tagUsers=this.dummyarray;
          console.log(JSON.stringify(this.tweetdata)+"in includes else part condition");
          this.doAddTweetApiCall();
          this.taguserArray=[];
           
           
        }

      }

      } catch (error) {

        console.log(error+"eoor catches");
        
      }
      

  }

}
