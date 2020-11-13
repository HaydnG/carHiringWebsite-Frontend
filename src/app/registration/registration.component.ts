import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {FormBuilder} from '@angular/forms';
import {EventEmitter} from 'events';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  template: `
      <div class="modal-header">
        <button type="button" class="close" aria-label="Close" (click)="closeRegister()">
          <span aria-hidden="true">&times;</span>
        </button>
        <h1 style="text-align: center;">Registration</h1>
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
              </div>
            </div>

            <div class="form-group row">
              <div class="col">
                <input class="form-control" type="date" value="" id="dob" formControlName="dob">
              </div>
            </div>

            <div class="form-group row">
              <div class="col">
                <input id="password" class="form-control" placeholder="Password" type="password" formControlName="password">
              </div>
            </div>
            <div class="form-group row">
              <div class="col">
                <input id="password2" class="form-control" placeholder="Re-type Password" type="password" formControlName="password2">
                <div *ngIf="matchError" class="errorMessage" > Passwords do not match </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col">
                <button class="button btn btn-primary form-control" type="submit">Register</button>
                <div *ngIf="requiredError" class="errorMessage"> Please fill in the required feilds </div>
              </div>
            </div>
          </div>

        </form>
      </div>
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

    .errorMessage{
      position: absolute;
      left: 96.5% !important;
      top: 0%;
      width: 50%;
      background: #800101;
      padding: 2px;
      /* margin: 2px; */
      border-radius: 0 10px 10px 10px;
      color: white;
      animation: 0.5s ease-out 0s 1 slideInFromLeft;
    }

    .close{
      padding: 0px;
      position: absolute;
      right: 5%;
      top: 6%;
    }

    .ng-invalid:not(form) {
        border: 1px solid red !important;
    }
`]
})
export class RegistrationComponent implements OnInit {

  errorActive = false;
  matchError; requiredError;
  now;
  registrationForm;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private activeModal: NgbActiveModal) {

    this.now = new Date();

    this.registrationForm = this.formBuilder.group({
      firstname: '',
      names: '',
      email: '',
      dob: '',
      password: '',
      password2: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(userData): void {
    console.warn('sending registration', userData);

    const errors: Array<boolean> = [];

    Object.keys(this.registrationForm.controls).forEach(key => {

      if (this.registrationForm.controls[key].value === '' || this.registrationForm.controls[key] ===  undefined){
        this.registrationForm.controls[key].setErrors({incorrect: true});
        errors.push(this.requiredError);
        console.log(this.registrationForm.controls[key]);
      }else{
        this.registrationForm.controls[key].setErrors(null);
      }
    });

    if (userData.password !== userData.password2){
      errors.push(this.matchError);
      return;
    }

    this.blinkMatchError(errors);

  }

  blinkMatchError(errors: Array<boolean>): void{
    if (!this.errorActive){
      this.errorActive = true;
      (async () => {
        // Do something before delay

        this.matchError = true;

        await this.delay(4000);

        this.matchError = false;

        this.errorActive = false;
      })();
    }
  }

  delay(ms: number): Promise<unknown> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  closeRegister(): void{
    this.activeModal.dismiss();
  }
}
