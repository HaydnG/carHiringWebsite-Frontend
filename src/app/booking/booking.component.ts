import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {FormArray, FormBuilder} from '@angular/forms';
import {NgbActiveModal, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../services/user/User';
import {CurrencyService} from '../services/currency/currency.service';
import {BookingService} from '../services/booking/booking.service';

@Component({
  selector: 'app-registration',
  template: `
    <div class="modal-header" xmlns="http://www.w3.org/1999/html">
      <button type="button" class="close" aria-label="Close" (click)="closeBooking()">
        <span aria-hidden="true">&times;</span>
      </button>
      <h1 style="text-align: center;">Booking</h1>
      <HR>
    </div>



    <div class="modal-body" style="position: relative;
    flex: 1 1 auto;
    padding: 10px 0px 0px 0px;">
        <div class="form-group" style="margin: 0 auto;width: 90%;">

          <div class="form-group row">
            <div class="col">
              <div class="row" style="left: 13px;
    position: relative;
    font-weight: 600;">Collection Date:</div>
              <div class="input-group">
                <input class="form-control" placeholder="yyyy-mm-dd"
                       name="start" disabled ngbDatepicker  [(ngModel)]="this.data.start"
                       #a="ngbDatepicker">
              </div>
            </div>
            <div class="col">
              <div class="row" style="font-weight: 600;">Return Date:</div>
              <div class="input-group row">
                <input class="form-control" placeholder="yyyy-mm-dd" value="" [(ngModel)]="this.data.end"
                       name="end" disabled ngbDatepicker>
              </div>
            </div>


          </div>

          <hr style="margin: 8px;
    border-color: #adadad;">

          <div class="row" style="display: block;
    text-align: center;">
            <div  style="margin: auto;
    width: 100%;
    font-size: 22px;
    font-weight: 700;">
              Information
            </div>


              <div style="border: 1px solid rgb(189 189 189);
        padding: 6px 8px 6px 8px;
        margin-bottom: 5px;">
                <div class="row">
                  <div class="col">Model: <strong> {{this.data.car.CarType.Description}}</strong></div>
                  <div class="col">Seats: <strong>{{this.data.car.Seats}}</strong></div>
                </div>
                <div class="row">
                  <div class="col">PerDay: <strong>{{this.currencyService.FormatValue(this.data.car.Cost)}}</strong></div>
                </div>
                <div class="row">
                  <div class="col">Total Days: <strong>{{this.data.daysSelected.value}}</strong></div>
                  <div class="col">Total Cost: <strong>{{this.data.totalCost.value}}</strong></div>
                </div>

                <hr>
                <div style="    text-align: center;margin-top: 7px;">
                  <div style=" margin-left: 5px;display: inline;font-weight: 700;">Pickup: 8:00am</div>
                </div>
                <div style="    text-align: center;margin-top: 7px;">
                  <div style=" margin-left: 5px;display: inline;font-weight: 700;">Return: <span *ngIf="!this.data.extension.value">1:00pm</span>
                    <span *ngIf="this.data.extension.value">4:00pm</span> </div>
                </div>

                <div class="row">
                  <div class="col" style="    text-align: center;margin-top: 7px;" [ngbTooltip]="extensionTIPbooking">
                    <ng-template #extensionTIPbooking>Extend booking until 4PM (Costs an additional half a day)</ng-template>
                    <input id="checkbox_extension_booking" type="checkbox" [(ngModel)]="this.data.extension.value">
                    <label class="checklabel" for="checkbox_extension_booking" style="    margin-bottom: 0px;">Extension</label>
                  </div>
                  <div class="col" style="    text-align: center;margin-top: 7px;" *ngIf="this.userService.repeat" [ngbTooltip]="tipContentbooking">
                    <input id="checkbox_late_booking" type="checkbox" [(ngModel)]="this.data.lateReturn.value">
                    <ng-template #tipContentbooking>This option is only for repeat customers.
                    Option to drop keys through letterbox after hours.</ng-template>
                    <label class="checklabel" for="checkbox_late_booking" style="    margin-bottom: 0px;">Late Return <span
                                                                                                        style="    font-size: 11px;
    color: green;">(Repeat Only)</span></label>
                  </div>
                </div>

              </div>
        </div>

          <div class="form-group row" style="display: block;    margin: auto;text-align: center;">
              <div  style="margin: auto;
    width: 100%;
    font-size: 22px;
    font-weight: 700;">
                Accessories
              </div>
              <div  style="text-align: center;
    font-size: 12px;">(Accessories in stock)
              </div>
             <div class="row" style="border: 1px solid rgb(189 189 189);
    padding: 6px 0px 6px 0px;
    margin-bottom: 5px;">
              <div class="col">
                <div class="accessory" *ngFor="let object of this.data.accessories | keyvalue">
                  <input id="checkbox_{{object.value.ID}}" type="checkbox" [(ngModel)]="object.value.Checked">
                  <label class="checklabel" for="checkbox_{{object.value.ID}}"> {{object.value.Description}}</label>
                </div>

              </div>
            </div>
          </div>

          <div class="form-group row" style="margin-top: 10px;">
            <div class="col">
              <button class="button btn btn-primary form-control" (click)="onSubmit()" >Create Booking</button>
            </div>
          </div>
        </div>
    </div>

  `,
  styles: [`

    .accessory{
      width: 139px;
      display: inline-block;
      text-align: center;
    }

    .close {
      padding: 0px;
      position: absolute;
      right: 5%;
      top: 6%;
    }

    .checklabel{
      margin-left: 6px;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
    }

    .ng-invalid:not(form) {
      border: 1px solid red !important;
    }
  `]
})
export class BookingComponent implements OnInit {


  data;
  now;


  constructor(private calendar: NgbCalendar, public userService: UserService, private activeModal: NgbActiveModal,
              public currencyService: CurrencyService, private bookingService: BookingService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('sending booking', this.data);
    this.bookingService.CreateBooking(this.data);

  }

  closeBooking(): void{
    this.activeModal.dismiss();
  }
}
