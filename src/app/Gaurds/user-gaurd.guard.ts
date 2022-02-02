import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGaurdGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      console.log(localStorage.getItem('role'));
   
      if(localStorage.getItem('role')!=null || localStorage.getItem('role')!=undefined || localStorage.getItem('jwttoken')!=null || localStorage.getItem('jwttoken')!=undefined || localStorage.getItem('name')!=null || localStorage.getItem('name')!=undefined)
      {
        console.log(localStorage.getItem('role'));
        if(localStorage.getItem('role')=='U')
        {
          return true;
        }
        else  
        {
          this.router.navigate(['/unauth']);

          return false;
        }
      
      }else
      {
        this.router.navigate(['/login']);
          
         return false;
      }
      
  
  }
  
  }
  

