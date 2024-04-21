import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public isAdmin:boolean = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isAdmin = sessionStorage.getItem('isAdmin') == 'true' ? true : false || false;
  }
  constructor(private authSvc:AuthService, private router:Router){}

  logout(){
    this.authSvc.logout()
          .subscribe({
            error:(err:any) => {
              this.router.navigateByUrl('');
              sessionStorage.clear()
            },
            next:(resp:any) => {
              sessionStorage.clear()
              this.router.navigateByUrl('');
            }
          });
  };
}
