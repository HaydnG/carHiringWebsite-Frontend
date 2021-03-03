import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Car} from '../services/car/Car';
import {Router} from '@angular/router';
import {Booking} from '../services/booking/Booking';
import {CurrencyService} from '../services/currency/currency.service';
import {PaymentComponent} from '../payment/payment.component';
import {BookingService} from '../services/booking/booking.service';
import {DetailsComponent} from '../booking-details/booking-details.component';
import {BookingComponent} from '../booking/booking.component';
import {EditBookingComponent} from '../edit-booking/edit-booking.component';
import {AdminService} from '../services/admin/admin.service';
import {AdminBooking} from '../services/admin/admin';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-admin-validtae-driver',
  template: `
        <div >
          <div class="modal-lg-dialog" style="    margin: 0px;">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="    font-size: 15px;
    font-weight: 500;">Driver Verification</h5>
                <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div style="position: absolute;
                      right: 14px;">BookingID: <span style="font-weight: bold">{{this.adminBooking.booking.ID}} </span>
                </div>

                <div class="col">
                  <div class="row" style="margin-top: 20px">

                    <div class="col-6 col-auto" style="min-width: 300px !important;">


                      <div class="row">
                        <form [formGroup]="driverForm" class="col" (ngSubmit)="onSubmit(driverForm.value)">
                          <div class="row">
                            <label class="form-label">Driver Details</label>
                          </div>
                          <div class="form-group row">
                            <div class="col">
                              <input ngbAutofocus id="firstname" class="form-control" placeholder="Last Name" formControlName="firstname">
                            </div>
                            <div class="col">
                              <input id="names" class="form-control" placeholder="Other Names" formControlName="names">
                            </div>
                          </div>
                          <label class="form-label">Address (As seen on license)</label>
                          <div class="form-group row">
                            <div class="col">
                              <input ngbAutofocus id="address" class="form-control" placeholder="Address Line 1" formControlName="address">
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="col">
                              <input ngbAutofocus id="postcode" class="form-control" placeholder="PostCode" formControlName="postcode">
                            </div>
                          </div>

                          <div class="form-group row">
                            <div class="col">
                              <input class="form-control" [minDate]="{year: 1940, month:1, day: 1}" [maxDate]="{day: this.now.getDate(), month: this.now.getMonth() + 1, year: this.now.getFullYear() - 18}" ngbDatepicker (click)="b.toggle()" ngbDatepicker
                                     #b="ngbDatepicker" placeholder="D.O.B" value="" id="dob" autocomplete="off" formControlName="dob">
                            </div>
                          </div>

                          <label class="form-label">Full driving license number (LastName + 12Characters):</label>
                          <div class="form-group row">
                            <div class="col">
                              <input ngbAutofocus id="license" class="form-control" placeholder="License Number" formControlName="license">
                            </div>
                          </div>

                          <div class="form-group row">
                            <div class="col">
                              <label class="form-label" for="customFile">Upload Drivers License</label>
                              <input class="form-control" type="file" (change)="addLicense($event)">
                            </div>

                          </div>
                        </form>

                      </div>


                      <div class="row">
                        <label class="form-label" for="customFile">Upload 1st Additional Document</label>
                        <input class="form-control" type="file" (change)="addDocument1($event)">
                      </div>
                      <div class="row">
                        <label class="form-label" for="customFile">Upload 2nd Additional Document</label>
                        <input class="form-control" type="file" (change)="addDocument2($event)">
                      </div>
                      <div class="row">
                        <input style="margin: 13px" type="checkbox" id="older" name="older" value="older">
                        <label for="older"> Documents no older than 3 months</label>
                      </div>
                    </div>
                    <div class="col-6">
                      <img style="max-width: 500px" *ngIf="this.driverLicense !== undefined" [src]="this.driverLicense">
                      <carousel *ngIf="this.document1 !== undefined || this.document2 !== undefined"  cellWidth="150%" height="350" cellsToShow="1" margin="10" overflowCellsLimit="2" counter="true">
                        <div  class="carousel-cell">
                          <img  *ngIf="this.document1 !== undefined" [src]="this.document1">
                        </div>
                        <div class="carousel-cell">
                          <img  *ngIf="this.document2 !== undefined" [src]="this.document2">
                        </div>
                      </carousel>

                    </div>

                    <div class="form-group col" style="margin-top: 10px">
                      <div class="row">
                        <div class="col">
                          <button style="    background-color: #3f7171ba;" class="button btn btn-primary form-control" type="submit" (click)="onSubmit(driverForm.value)">Submit Driver Verification</button>
                          <div *ngIf="this.required" class="errorMessage"> Please fill in the required feilds </div>
                        </div>
                      </div>

                    </div>
                  </div>




                </div>

              </div>


            </div>
          </div>
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

    .errorMessage {
      position: absolute;
      left: 10px !important;
      top: 45px;
      width: 50%;
      background: #800101;
      padding: 3px;
      /* margin: 2px; */
      border-radius: 0 10px 10px 10px;
      color: white;
      animation: 0.5s ease-out 0s 1 slideInFromLeft;
    }

    .form-group {
      margin-bottom: 5px;
    }
    label {
      display: inline-block;
      margin-bottom: .5rem;
      font-size: 16px;
      margin-top: 10px;
    }
    .form-control {
      display: block;
      width: 100%;
      padding: 10px;
      height: 44px;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #ffffff;
      background-color: #42494a96;
      background-clip: padding-box;
      border: 0px solid #ced4da;
      box-shadow: inset 1px 2px 10px 6px #00000026;
      border-radius: .25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .extraPayment {
      background-color: #6c3aa2;
      color: #dbdbdb;
      border-color: #5d318c;
    }
    .confirm {
      background-color: #64a549;
      color: #f6f6f6;
      border-color: #43772e;
    }

    .modal-content {
      display: contents !important;
    }

    :host {
      padding: 0px;
      margin: 0px;
      width: 100% !important;
    }

    .col-auto {
      min-width: 283px !important;
    }

    .day {
      margin-left: 5px;
      font-weight: 500;
    }

    hr {
      margin: 2px 0px 2px 0px;
    }

    .dates {
      font-weight: 500;
      min-width: 195px;
    }

    .header {
      font-weight: bold;
    }

    .start {
      color: green;
    }

    .end {
      color: darkred;
    }

    .endtext {
      color: black;
    }

    .time {
      font-weight: bold;
      font-size: 14px;
      position: relative;
      left: 3px;
      line-height: 21px;
    }

    .deny {
      background-color: #693030;
      color: #dbdbdb;
      border-color: #5a2222;
    }

    img {
      width: 100%;
    }

    :host {
      width: 90%;
      margin: 5px auto;
    }
  `]
})
export class AdminValidateDriverComponent implements OnInit {




  @Input()
  adminBooking: AdminBooking;

  ngbModalOptions;

  @Input()
  failed;

  @Output()
  reloadPage: EventEmitter<any> = new EventEmitter<any>();

  driverLicense = undefined;
  document1 = undefined;
  document2 = undefined;
  now;

  required = false;

  driverForm;

  constructor(private router: Router, private formBuilder: FormBuilder, public currencyService: CurrencyService, private modalService: NgbModal,
              private adminService: AdminService, public bookingService: BookingService, private activeModal: NgbActiveModal) {
    this.now = new Date();

    this.driverForm = this.formBuilder.group({
      firstname: '',
      names: '',
      dob: '',
      address: '',
      postcode: '',
      license: '',
    });

  }

  ngOnInit(): void {

  }

  onSubmit(data): void {
    console.log(data);

    Object.keys(this.driverForm.controls).forEach(key => {

      if (this.driverForm.controls[key].value === '' || this.driverForm.controls[key] ===  undefined){
        this.blinkError();
      }
    });

  }

  blinkError(): void{

      (async () => {
        // Do something before delay
          this.required = true;

          await this.delay(3000);

          this.required = false;


      })();
  }

delay(ms: number): Promise<unknown> {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

  addLicense(event): void {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.driverLicense = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  addDocument1(event): void {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.document1 = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addDocument2(event): void {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.document2 = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  progressBooking(failed: boolean): void {
    this.adminService.ProgressBooking( failed, this.adminBooking.booking.ID, data => {
      this.reloadPage.next(true);
      this.activeModal.dismiss();
    });
  }

  closeBooking(): void{
    this.activeModal.dismiss();
  }

  processExtraPayment(): void {

  }

  grantRefund(): void {

  }
}
