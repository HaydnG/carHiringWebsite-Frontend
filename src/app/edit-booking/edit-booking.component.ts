import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {FormArray, FormBuilder} from '@angular/forms';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../services/user/User';
import {CurrencyService} from '../services/currency/currency.service';
import {BookingService} from '../services/booking/booking.service';
import {PaymentComponent} from '../payment/payment.component';
import {Router} from '@angular/router';
import {Booking} from '../services/booking/Booking';
import {CarService} from '../services/car/car.service';
import {Accessory} from '../services/car/Car';

@Component({
  selector: 'app-edit-booking',
  template: `


    <div class="modal-header" xmlns="http://www.w3.org/1999/html">

        <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;
    width: 93%;
    font-size: 30px;">Edit Booking</h5>
        <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <HR *ngIf="this.nextDayBooked()">
        <div style="font-size: 13px;
    color: darkred;
    text-align: center;" class="row" *ngIf="this.nextDayBooked()"> The next day for this car already has a booking, and so this booking requires an early return. Extension options are disabled</div>

      <HR>
    </div>



    <div class="modal-body" style="position: relative;
    flex: 1 1 auto;
    padding: 10px 0px 0px 0px;">
        <div class="form-group" style="margin: 0 auto;width: 90%;">

          <div class="row" style="padding: 0px 20px 5px 25px;">
            <div style="position: absolute; font-size: 14px;
                    right: 5px;">BookingID: <span style="font-weight: bold">{{this.booking.ID}} </span>
            </div>
            <div class="col-6 col-auto">
              <div class="row header">
                Collection: <span class="day"> {{this.dayNames[this.endDate.getDay()]}}</span>
              </div>
              <div class="row dates">
                {{this.startFormatted}} - <span class="time start"> From 08:00AM</span>
              </div>
            </div>
            <div class="col-auto">
              <div class="row header">
                Return: <span class="day"> {{this.dayNames[this.startDate.getDay()]}}</span>
              </div>
              <div class="row dates">
                {{this.endFormatted}} - <span class="time end" *ngIf="!this.extension && !this.lateReturn"> At 1:00pm</span>
                <span class="time end"*ngIf="this.extension && !this.lateReturn"> At 4:00pm</span>
                <span class="time end"*ngIf="this.lateReturn"> After 6:00pm</span>
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
                  <div class="col">Model: <strong> {{this.booking.carData.CarType.Description}}</strong></div>
                  <div class="col">Seats: <strong>{{this.booking.carData.Seats}}</strong></div>
                </div>
                <div class="row">
                  <div class="col">PerDay: <strong>{{this.currencyService.FormatValue(this.booking.carData.Cost)}}</strong></div>
                </div>
                <div class="row">
                  <div class="col">Total Days: <strong>{{this.booking.bookingLength}}</strong></div>
                  <div class="col">Total Cost: <strong>{{this.currencyService.FormatValue(this.booking.totalCost)}}</strong></div>
                </div>

                <hr>
                <div style="    text-align: center;margin-top: 7px;">
                  <div style=" margin-left: 5px;display: inline;font-weight: 700;">Pickup: 8:00am</div>
                </div>
                <div style="    text-align: center;margin-top: 7px;">
                  <div style=" margin-left: 5px;display: inline;font-weight: 700;">Return: <span *ngIf="!this.extension && !this.lateReturn || this.nextDayBooked()">1:00pm</span>
                    <span *ngIf="this.extension && !this.lateReturn && !this.nextDayBooked()">4:00pm</span>
                    <span *ngIf="this.lateReturn && !this.nextDayBooked()">6:00pm</span></div>
                </div>

                <ng-template #nextday>These options are only availble if the next day is not booked</ng-template>
                <div class="row" placement="bottom"[disableTooltip]="!this.nextDayBooked()" [ngbTooltip]="nextday">
                  <div [disableTooltip]="this.nextDayBooked()" placement="bottom" class="col" style="    text-align: center;margin-top: 7px;" [ngbTooltip]="extensionTIPbooking">
                    <ng-template #extensionTIPbooking>Extend booking until 4PM (Costs an additional half a day)</ng-template>
                    <input [disabled]="this.lateReturn || this.nextDayBooked()" id="checkbox_extension_booking" type="checkbox" [(ngModel)]="this.extension">
                    <label class="checklabel" for="checkbox_extension_booking" style="    margin-bottom: 0px;">Extension</label>
                  </div>
                  <div [disableTooltip]="this.nextDayBooked()" placement="bottom" class="col" style="    text-align: center;margin-top: 7px;" *ngIf="this.userService.repeat" [ngbTooltip]="tipContentbooking">
                    <input [disabled]="this.nextDayBooked()" id="checkbox_late_booking" type="checkbox" [(ngModel)]="this.lateReturn">
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
                <div class="accessory" *ngFor="let object of this.accessories | keyvalue">
                  <input id="checkbox_{{object.value.ID}}" type="checkbox" [(ngModel)]="object.value.Checked">
                  <label class="checklabel" for="checkbox_{{object.value.ID}}"> {{object.value.Description}}</label>
                </div>

              </div>
            </div>
          </div>

          <div class="form-group row" style="margin-top: 10px;">
            <div class="col">
              <button class="button btn btn-primary form-control" (click)="onSubmit()" >Edit booking</button>
            </div>
          </div>
        </div>
    </div>

  `,
  styles: [`

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
      line-height: 24px;
    }

    .accessory{
      width: 139px;
      display: inline-block;
      text-align: center;
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
export class EditBookingComponent implements OnInit, OnDestroy {


  booking: Booking;
  now;
  ngbModalOptions;

  accessories;
  bookings;

  lateReturn;
  extension;

  startDate;
  endDate;

  dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  startFormatted;
  endFormatted;

  bookingsSub;
  accessorySub;

  constructor(private calendar: NgbCalendar, public userService: UserService, private activeModal: NgbActiveModal,
              public currencyService: CurrencyService, private bookingService: BookingService,  private modalService: NgbModal,
              private router: Router, private carService: CarService) {



    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

  }

  ngOnDestroy(): void {
    this.bookingsSub.unsubscribe();
    this.accessorySub.unsubscribe();
  }

  ngOnInit(): void {


    this.bookingsSub = this.carService.carBookingsChange.subscribe(data => {
      this.bookings = data;

    });

    this.accessorySub = this.carService.accessoryListChange.subscribe(data => {
      for (const value in this.booking.accessories) {
        if (data.hasOwnProperty(this.booking.accessories[value].ID)){
            data[this.booking.accessories[value].ID].Checked = true;
        }
      }

      this.accessories = data;

    });

    this.carService.LoadAccessories(this.booking.start, this.booking.end);
    this.carService.LoadBookings(this.booking.finish + (60 * 60 * 24), this.booking.finish + (60 * 60 * 24), this.booking.carData.ID);

    this.extension = this.booking.extension;
    this.lateReturn = this.booking.lateReturn;
    this.startDate = new Date(this.booking.start * 1000);
    this.endDate = new Date(this.booking.end * 1000);

    this.startFormatted = this.startDate.toISOString().split('T')[0];
    this.endFormatted = this.endDate.toISOString().split('T')[0];
  }

  onSubmit(): void {
    const remove: Accessory[] = [];

    for (const value in this.booking.accessories) {
      if (this.accessories.hasOwnProperty(this.booking.accessories[value].ID)){
        if (this.accessories[this.booking.accessories[value].ID].Checked === false){
          remove.push(this.accessories[this.booking.accessories[value].ID]);
        }else {
          delete this.accessories[this.booking.accessories[value].ID];
        }

      }
    }

    for (const value in this.accessories) {
      if (this.accessories[value].Checked === false) {
        delete this.accessories[value];
      }
    }

    console.log(remove);
    console.log(this.accessories);

    this.bookingService.EditBooking(this.booking.ID, remove, this.accessories, this.lateReturn, this.extension, data => {
      this.bookingService.GetUsersBookings();
      this.activeModal.dismiss();
    });

  }

  nextDayBooked(): boolean{
    if (this.bookings !== undefined && this.bookings.length > 0){
      return true;
    }

    return false;
  }

  closeBooking(): void{
    this.activeModal.dismiss();
  }
}
