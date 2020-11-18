import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RegistrationComponent} from '../registration/registration.component';


@Component({
  selector: 'app-login',
  template: `
    <a style="padding-bottom: 10px" role="button" (click)="register()">Need an account? Register</a>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm.value)">

    <div style="display: flex;flex-wrap:wrap">


      <div class="row" style="width: 80%;justify-content: space-evenly">
        <div class="col">
          <input id="username" class="auth form-control" placeholder="Username" formControlName="username">
        </div>
        <div class="col">
          <input id="password" class="auth form-control" placeholder="Password" type="password" formControlName="password">
        </div>
      </div>
      <div style="align-self: center; margin: 0 auto;">
        <button class="BUTTON" type="submit">Login</button>
     </div>

    </div>
    </form>
`,
  styles: [`
    :host {
      width: 100%;
    }
    .center {
      left: 50%;
    }

    .auth {
      font-size: 14px;
      margin: 5px 5px 5px 0px;
      height: 30px;
      border-radius: 2px;
      min-width: 150px;
    }

    .col {
      padding-left: 5px;
      padding-right: 5px;
    }

    .BUTTON {
      width: 80px;
      height: 30px;
      border: 0;
      border-radius: 5px;
      color: #FFFFFF;
      font-size: 15px;
      font-weight: 100;
      background-color: #373E40;
      text-shadow: 1px 1px 20px #000000;
      text-decoration: none;
      display: inline-block;
      cursor: pointer;
      text-align: center;
    }

    .BUTTON:hover {
      background: #464f51;
      text-decoration: none;
    }

    .spacer {
      flex-grow: 1;
    }
  `]
})
export class LoginComponent implements OnInit {

  loginForm;
  ngbModalOptions: NgbModalOptions;
  registerModel;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });

    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
  }

  ngOnInit(): void {
  }

  onSubmit(userData): void {
    console.warn('sending login', userData);
    this.userService.Login(userData.username, userData.password);
  }

  register(): void{
    this.registerModel = this.modalService.open(RegistrationComponent, this.ngbModalOptions);

  }


}
