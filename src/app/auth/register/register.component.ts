import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public email:string = '';
  public debounceWaitTime: number = 500;
  public isAdmin:boolean = false;
  public loading:boolean = false;
  public showPassword:boolean = false;
  public timerValidateEmail!:any;
  public password:string = '';
  public username:string = '';
  public validEmail:boolean = false;
  public errMessage:string = '';
  constructor(private authSvc: AuthService, private router:Router){}


  // register user method
  register(){
    this.loading = !this.loading;
    const data = {
      username: this.username,
      email:this.email,
      password:this.password,
      isAdmin: this.isAdmin
    };

    this.authSvc.register(data)
            .subscribe({
              error:(err:any) => {
                console.log(err);
                this.loading = !this.loading;
                this.errMessage = err.error.message
              },
              next:(resp:any) => {
                console.log(resp);
                sessionStorage.setItem('accessToken', resp.token);
                sessionStorage.setItem('isAdmin', resp.isAdmin);
                sessionStorage.setItem('username', resp.username);
                sessionStorage.setItem('email', resp.email);
                sessionStorage.setItem('userId', resp.id);
                this.loading = !this.loading;
                Swal.fire('Éxito', 'Tu cuenta ha sido creada','success')
                this.router.navigateByUrl('/home')
              }
            })
  }



  // validate email syntax method
  validateEmail() {
    clearTimeout(this.timerValidateEmail);
    this.timerValidateEmail = setTimeout(() => {
      return this.validEmail =  /^[^\.@\s][^@\s]*?([^\.@\s]@(?!\.)){1}([^@\s]+([\.][a-zA-Z0-9]{1,}){1,}){1}$/.test(this.email);
    }, this.debounceWaitTime);
  };
}
