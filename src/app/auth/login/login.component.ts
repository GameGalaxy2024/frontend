import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // current user
  //     cuelloroyoj@gmail.com
  //   demodemo123

  //  admin user
  // admin@gmail.com
  // admin
  public email:string = '';
  public errMessage:string = '';
  public loading:boolean = false;
  public password:string = '';
  public showPassword:boolean = false;

  constructor(private authSvc:AuthService, private router:Router){}


  login(){
    const data = {
        email:this.email,
        password:this.password
    };

    this.authSvc.login(data)
            .subscribe({
              error:(err:any) => {
                this.errMessage = err.error.message;
              },
              next:(resp:any) => {
                sessionStorage.setItem('accessToken', resp.token);
                sessionStorage.setItem('isAdmin', resp.isAdmin);
                sessionStorage.setItem('username', resp.username);
                sessionStorage.setItem('email', resp.email);
                sessionStorage.setItem('userId', resp.id);
                this.loading = !this.loading;
                this.router.navigateByUrl('/home')
              }
            })
  }
}
