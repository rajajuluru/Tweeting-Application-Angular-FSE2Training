import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ReponseHelpeClassMaster } from '../HelperClasses/reponse-helpe-class-master';
import { RestApiServicesService } from '../rest-api-services.service';

@Injectable({
  providedIn: 'root'
})
export class UserGaurdGuard implements CanActivate {

 responsedatafortoken :ReponseHelpeClassMaster=new ReponseHelpeClassMaster(false,"");



  constructor(private router:Router,private restapiservice:RestApiServicesService){}

  async fetchData(){
    const res:any = await this.restapiservice.doCheckValidJWTtoken().toPromise();
    this.responsedatafortoken=res.data;
    console.log("in fetch data response"+JSON.stringify(res));
    return this.responsedatafortoken.status;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log(localStorage.getItem('userid'));
   

      try {
      

         console.log(   JSON.stringify(this.fetchData())+"   this.fetchData();")
     
         console.log(JSON.stringify( this.responsedatafortoken)+"this.restapiservice.responsedatafortoken");
        
        // this.restapiservice.doCheckValidJWTtoken().subscribe((data1)=>{
       
        //   console.log(JSON.stringify(data1)+"data from server in doCheckValidJWTtoken");
        //   responsedatafortoken=data1;
        //   console.log(JSON.stringify(responsedatafortoken)+"responsedatafortokenresponsedatafortoken")
          
        //   });
      } catch (error) {
        console.log(error+"error");
        
      }
      console.log(JSON.stringify(this.responsedatafortoken)+"data from server in user gaurd");
   
      if((localStorage.getItem('userid')!=null || localStorage.getItem('userid')!=undefined || localStorage.getItem('jwttoken')!=null || localStorage.getItem('jwttoken')!=undefined) &&    this.fetchData())
      {
          console.log("true in if condition");
          return true;
      }else
      {
        this.router.navigate(['/login']);
        
        console.log("true in else condition");
          
         return false;
      }
      
  
  }
  
  }
  


