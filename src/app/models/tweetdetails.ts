import { ReplyTweetDetails } from "./reply-tweet-details";
import { UserRegister } from "./user-register-class";

export class Tweetdetails {

    
    message!:string;
    tagUsers!:string[];
    tweetId!:string;
    userEmail!:string;
    tweetdate!:Date;
    status!:number;
    likedUsersList!:UserRegister[];
    repliedUsersList!:ReplyTweetDetails[];
}
