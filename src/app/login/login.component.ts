import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RegistrationComponent} from '../registration/registration.component';


@Component({
  selector: 'app-login',
  template: `
    <div *ngIf="this.isModal" class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="closeLogin()">
        <span aria-hidden="true">&times;</span>
      </button>
      <h1 style="text-align: center;">Login</h1>
      <HR>
    </div>

    <div [class.isModal]="isModal">

      <div style="min-width: 169px;
    text-align: left;
    position: relative;
    left: -12px;"> <a style="padding-bottom: 10px" role="button" (click)="register()">Need an account? Register</a>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm.value, $event)">

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
    </div>
`,
  styles: [`
    .isModal{
      padding: 11px 6px 16px 30px;
    }

    .close {
      z-index: 100;
      adding: 0px;
      position: absolute;
      right: 7%;
      top: 11%;
    }
    :host {
      width: 100%;
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

    @media screen and (max-width: 600px){
        .BUTTON{
          left: 17px;
          position: relative;
          width: 58px;
          height: 50px;
        }
      .auth{
        width: 100px;
        left: 12px;
        position: relative;
      }
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

  nextModal;
  modalData;
  isModal;
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

  onSubmit(userData, $event: any): void {
    $event.srcElement.blur();
    $event.target.blur();
    $event.preventDefault();

    if (userData.username.length <= 0 || userData.password.length <= 0){
      return;
    }

    console.warn('sending login', userData);
    this.userService.Login(userData.username, userData.password);
    if (this.modalService.hasOpenModals()){
      this.modalService.dismissAll();
      const temp = this.modalService.open(this.nextModal, this.ngbModalOptions);
      temp.componentInstance.data = this.modalData;


    }
  }

  register(): void{
    if (this.modalService.hasOpenModals()){
      this.modalService.dismissAll();
    }

    this.registerModel = this.modalService.open(RegistrationComponent, this.ngbModalOptions);

  }


  closeLogin(): void{
    if (this.modalService.hasOpenModals()){
      this.modalService.dismissAll();
    }
  }

}
