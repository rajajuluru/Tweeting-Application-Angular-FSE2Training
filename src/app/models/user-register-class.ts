
export class UserRegister{

    firstName:string;
    lastName:string;
    email:string;

password:string;
mobilenumber:number;


constructor( 
    firstName:string,
    lastName:string, 
    email:string,
  
    password:string,
    mobilenumber:number,
   )
{
    this.firstName=firstName;
    this.lastName=lastName;
    this.email=email;
  
    this.password=password;
    this.mobilenumber=mobilenumber;

   
}
}