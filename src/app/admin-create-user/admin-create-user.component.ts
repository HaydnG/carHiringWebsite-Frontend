import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../services/user/User';
import {NgbDateStructAdapter} from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import {ToolsService} from '../services/tools/tools.service';
import {AdminService} from '../services/admin/admin.service';
import {NavService} from '../services/nav/nav.service';

@Component({
  selector: 'app-admin-create-user',
  template: `
      <div class="modal-header">
        <button type="button" class="close" aria-label="Close" (click)="closeRegister()">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="row">
            <h1 class="col-4" style="text-align: center;min-width: 140PX">Admin Create User</h1><div class="col" style="    min-width: 160px;
    margin: 6px 5px 12px 1px;
    color: #ff9b9b;"> - User must be over 18 to use this service</div>
        </div>
        <HR>
      </div>


      <div class="modal-body">
        <form [formGroup]="registrationForm" (ngSubmit)="onSubmit(registrationForm.value)">
          <div class="form-group" style="margin: 0 auto;width: 90%;">

            <div class="form-group row">
              <div class="col">
                <input ngbAutofocus id="firstname" class="form-control" placeholder="FirstName" formControlName="firstname">
              </div>
              <div class="col">
                <input id="names" class="form-control" placeholder="Other Names" formControlName="names">
              </div>
            </div>

            <div class="form-group row">
              <div class="col">
                <input id="email" class="form-control" placeholder="Email" formControlName="email">
                <div *ngIf="this.errors['email']" class="errorMessage" > Please enter a valid email address </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col">
                <input class="form-control" [minDate]="{year: 1940, month:1, day: 1}" [maxDate]="{day: this.now.getDate(), month: this.now.getMonth() + 1, year: this.now.getFullYear() - 18}" ngbDatepicker (click)="b.toggle()" ngbDatepicker
                       #b="ngbDatepicker" placeholder="D.O.B" value="" id="dob" autocomplete="off" formControlName="dob">
                <div *ngIf="this.errors['birthday']" class="errorMessage"> You must be over 18+ </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col">
                <input id="password" class="form-control" placeholder="Password" type="password" formControlName="password">
                <div *ngIf="this.errors['password']" class="errorMessage" >{{this.passwordMessage}}</div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col">
                <input id="password2" class="form-control" placeholder="Re-type Password" type="password" formControlName="password2">
                <div *ngIf="this.errors['match']" class="errorMessage" > Passwords do not match </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col">
                <button class="button btn btn-primary form-control" type="submit">Register</button>
                <div *ngIf="this.errors['required']" class="errorMessage"> Please fill in the required feilds </div>
              </div>
            </div>
          </div>

        </form>
      </div>
      <div *ngIf="this.responseShow" class="failMessage"> {{this.responseMessage}}</div>
      <div *ngIf="this.failMessage" class="failMessage"> Registration failed</div>
      <div *ngIf="this.successMessage" class="successMessage"> Successfully created a new user with the email: {{this.user.Email}}</div>
`,
  styles: [`
    @keyframes slideInFromLeft {
      0% {
        transform: translateX(0%);
        opacity: 0;
      }
      50% {
        transform: translateX(-5%);
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .failMessage {
      text-align: center;
      top: 100%;
      left: 0% !important;
      position: absolute;
      width: 100%;
      background: #800101;
      padding: 3px;
      /* margin: 2px; */
      border-radius: 10px;
      color: white;
      animation: 0.5s ease-out 0s 1 slideInFromLeft;
    }

    .successMessage {
      text-align: center;
      top: 100%;
      left: 0% !important;
      position: absolute;
      width: 100%;
      background: #2b6b02;
      padding: 3px;
      /* margin: 2px; */
      border-radius: 10px;
      color: white;
      animation: 0.5s ease-out 0s 1 slideInFromLeft;
    }

    .errorMessage {
      position: absolute;
      left: 96.5% !important;
      top: 0%;
      width: 50%;
      background: #800101;
      padding: 3px;
      /* margin: 2px; */
      border-radius: 0 10px 10px 10px;
      color: white;
      animation: 0.5s ease-out 0s 1 slideInFromLeft;
    }

    @media screen and (max-width: 860px) {
      .errorMessage {
        position: absolute;
        left: 3% !important;
        top: 85%;
        opacity: 0.9;
        width: 90%;
        background: #800101;
        padding: 1px;
        /* margin: 2px; */
        border-radius: 0 10px 10px 10px;
        color: white;
        animation: 0.5s ease-out 0s 1 slideInFromLeft;
      }
    }

    .close {
      padding: 0px;
      position: absolute;
      right: 5%;
      top: 6%;
      z-index: 100;
    }

    .ng-invalid:not(form) {
      border: 1px solid red !important;
    }
  `]
})
export class AdminCreateUserComponent implements OnInit {

  errors: { [id: string]: boolean; } = {
    email: false,
    password: false,
    required: false,
    match: false,
    birthday: false,
  };
  errorsActive: { [id: string]: boolean; } = {
    email: false,
    password: false,
    required: false,
    match: false,
    birthday: false,
  };

  responseMessage;
  responseShow = false;

  maxDate: NgbDateStruct;
  user: User;
  failMessage;
  successMessage;
  passwordMessage;
  now;
  registrationForm;
  userSubscription;


  constructor(private userService: UserService,
              private navService: NavService,
              private formBuilder: FormBuilder, private activeModal: NgbActiveModal, private toolService: ToolsService, public adminService: AdminService) {


    this.now = new Date();


    this.registrationForm = this.formBuilder.group({
      firstname: '',
      names: '',
      email: '',
      dob: '',
      password: '',
      password2: '',
    });

    this.userSubscription = this.userService.userChange.subscribe((value) => {
      if (value === null){
        (async () => {
          // Do something before delay

          this.failMessage = true;

          await this.delay(3000);

          this.failMessage = false;
        })();

        return;
      }
      if (value.Message !== undefined && value.Message !== ''){
        this.responseMessage = value.Message;
        (async () => {
          // Do something before delay

          this.responseShow = true;

          await this.delay(3000);

          this.responseShow = false;
        })();

        return;
      }

      this.user = value;

      if (this.user.SessionToken !== '0' && this.user.SessionToken !== undefined){
        (async () => {
          // Do something before delay

          this.successMessage = true;

          await this.delay(2000);

          this.successMessage = false;
          this.closeRegister();

        })();
      }
    });
  }

  ngOnInit(): void {
  }

  onSubmit(userData): void {
    console.warn('sending registration', userData);

    const errors: Array<string> = [];
    let required = false;

    console.log(userData.dob);
    const dobDate = new Date(userData.dob.year, userData.dob.month - 1, userData.dob.day);
    console.log(this.toolService.calculateAge(dobDate));

    if (this.toolService.calculateAge(dobDate) < 18){
      errors.push('birthday');
    }

    Object.keys(this.registrationForm.controls).forEach(key => {

      if (this.registrationForm.controls[key].value === '' || this.registrationForm.controls[key] ===  undefined){
        this.registrationForm.controls[key].setErrors({incorrect: true});
        required = true;
        return;
      }else{
        this.registrationForm.controls[key].setErrors(null);
      }
    });

    if (required){
      errors.push('required');
    }

    const emailValid = '^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
    if (!userData.email.match(emailValid)){
      errors.push('email');
    }




    if (this.invalidPassword(userData.password)){
      errors.push('password');
    }

    if (userData.password !== userData.password2){
      errors.push('match');
    }

    if (errors.length > 0){
      this.blinkError(errors);
    }else {


      this.adminService.CreateUser(userData.firstname, userData.names, userData.email, userData.password,
        (new Date(userData.dob.year, userData.dob.month - 1,
          userData.dob.day).getTime() / 1000) + '', newUser => {
          this.activeModal.close();

          const id = newUser.ID;
          this.navService.Navigate('/admin/user', 0, ['admin/user/view', {id}]);
        });
    }
  }

  blinkError(errorList: Array<string>): void{

    errorList.forEach(type => {
      (async () => {
        // Do something before delay
        if (!this.errorsActive[type]) {
          this.errors[type] = true;
          this.errorsActive[type] = true;

          await this.delay(3000);

          this.errors[type] = false;
          this.errorsActive[type] = false;
        }

      })();
    });
  }

  invalidPassword(password: string): boolean{
    if (password.length < 8){
      this.passwordMessage = 'The password must exceed 8 characters';
      return true;
    }

    const lowerCaseLetters = /[a-z]/g;
    if (!password.match(lowerCaseLetters)){
      this.passwordMessage = 'The password must contain a lowercase character';
      return true;
    }

    const upperCaseLetters = /[A-Z]/g;
    if (!password.match(upperCaseLetters)){
      this.passwordMessage = 'The password must contain a uppercase character';
      return true;
    }

    const numbers = /[0-9]/g;
    if (!password.match(numbers)){
      this.passwordMessage = 'The password must contain a number';
      return true;
    }

    return false;
  }

  delay(ms: number): Promise<unknown> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  closeRegister(): void{
    this.activeModal.dismiss();
  }
}
