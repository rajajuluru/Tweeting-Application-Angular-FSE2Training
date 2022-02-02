import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }
  loginStatus:boolean=false;
  ngOnInit(): void {

    localStorage.clear();
    this.loginStatus=false;
 
    
    // if(localStorage.getItem('role')!=null || localStorage.getItem('role')!=undefined || localStorage.getItem('jwttoken')!=null || localStorage.getItem('jwttoken')!=undefined || localStorage.getItem('name')!=null || localStorage.getItem('name')!=undefined)
    // {
    //   this.loginStatus=true;
    // }
    // else{
    //    this.loginStatus=false;
    // }
    Swal.fire("logged out successfully");
    this.router.navigate(['/redirect']);
  //   this.router.navigateByUrl('/home', {skipLocationChange: false}).then(() => {
  //     this.router.navigate(['/home']);
  // });
    //location.reload();

  }

}
