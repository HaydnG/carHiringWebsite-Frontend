import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <a style="padding-bottom: 10px">Need an account? Register</a>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm.value)">

    <div style="display: flex;flex-wrap:wrap">


      <div style="width: 80%;justify-content: space-evenly">
        <input id="username" class="auth" placeholder="Username" formControlName="username">
        <input id="password" class="auth" placeholder="Password" type="password" formControlName="password">
      </div>
      <div style="align-self: center; margin: 0 auto;">
        <button class="button" type="submit">Login</button>
     </div>

    </div>
    </form>
`,
  styles: [`
  :host {
      width: 25%;
  }

  .center{
    left: 50%;
  }
  .auth{
  ;
    margin: 5px 5px 5px 0px;
    width: 45%;
    height: 20px;
    min-width: 80px;
    max-width: 160px;
  }

  .spacer {
    flex-grow: 1;
  }
  `]
})
export class LoginComponent implements OnInit {

  loginForm;
  public user;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(userData) {
    console.warn('sending login', userData);
    this.userService.Login(userData.username, userData.password);
  }
}
