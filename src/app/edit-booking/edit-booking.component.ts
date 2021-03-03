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
import {ToolsService} from '../services/tools/tools.service';

@Component({
  selector: 'app-edit-booking',
  template: `


    <div class="modal-header" xmlns="http://www.w3.org/1999/html">

        <div class="col">
          <h5 class="modal-title row" id="exampleModalLabel" style="text-align: center;
        width: 93%;
        font-size: 30px;">Edit Booking</h5>
          <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <HR *ngIf="this.nextDayBooked()">
          <div style="font-size: 13px;
        color: #bf5c5c;
        text-align: center;" class="row" *ngIf="this.nextDayBooked()"> The next day has a booking, and so this booking requires an
            early return.
            You can move your booking back 1 day if you would like later return options.
          </div>
        </div>
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
              Collection: <span class="day"> {{this.dayNames[this.startDate.getDay()]}}</span>
            </div>
            <div class="row dates">
              {{this.startFormatted}} - <span class="time start"> From 08:00AM</span>
            </div>
          </div>
          <div class="col-auto">
            <div class="row header">
              Return: <span class="day"> {{this.dayNames[this.endDate.getDay()]}}</span>
            </div>
            <div class="row dates">
              {{this.endFormatted}} - <span class="time end">{{this.toolService.getTimeString(this.fullDay, this.lateReturn, this.nextDayBooked())}}</span>
            </div>
          </div>
        </div>

        <hr style="margin: 8px;
    border-color: #adadad;">

        <div class="row" style="display: block;
    text-align: center;">
          <div style="margin: auto;
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
              <div class="col">PerDay: <strong>{{this.currencyService.FormatValue(this.booking.perDay)}}</strong></div>
            </div>
            <div class="row">
              <div class="col">Total Days: <strong>{{this.getAmountofdays()}}</strong></div>
              <div class="col">Total Cost: <strong>{{this.currencyService.FormatValue(this.booking.totalCost)}}</strong></div>
            </div>

            <hr>
            <div style="    text-align: center;margin-top: 7px;">
              <div style=" margin-left: 5px;display: inline;font-weight: 600;">Pickup: 8:00am</div>
            </div>
            <div style="    text-align: center;margin-top: 7px;">
              <div style=" margin-left: 5px;display: inline;font-weight: 600;">Return: {{this.toolService.getTimeString(this.fullDay, this.lateReturn, this.nextDayBooked())}}
            </div>

            <ng-template #nextday>These options are only availble if the next day is not booked</ng-template>
            <div class="row" *ngIf="this.booking.processID !== this.bookingService.statuses.CollectedBooking" placement="bottom" [disableTooltip]="!this.nextDayBooked()"
                 [ngbTooltip]="nextday">
              <div [disableTooltip]="this.nextDayBooked()" placement="bottom" class="col" style="    text-align: center;margin-top: 7px;"
                   [ngbTooltip]="fullDayTIPbooking">
                <ng-template #fullDayTIPbooking>Increase last day to the full duration</ng-template>
                <input [disabled]="this.lateReturn || this.nextDayBooked()" id="checkbox_fullDay_booking" type="checkbox"
                       [(ngModel)]="this.fullDay">
                <label class="checklabel" for="checkbox_fullDay_booking" style="    margin-bottom: 0px;">Full Day</label>
              </div>
              <div [disableTooltip]="this.nextDayBooked()" placement="bottom" class="col" style="    text-align: center;margin-top: 7px;"
                   *ngIf="this.userService.repeat" [ngbTooltip]="tipContentbooking">
                <input [disabled]="this.nextDayBooked()" id="checkbox_late_booking" type="checkbox" [(ngModel)]="this.lateReturn">
                <ng-template #tipContentbooking>This option is only for repeat customers.
                  Option to drop keys through letterbox after hours.
                </ng-template>
                <label class="checklabel" for="checkbox_late_booking" style="    margin-bottom: 0px;">Late Return <span
                  style="    font-size: 11px;
    color: green;">(Repeat Only)</span></label>
              </div>
            </div>

          </div>
        </div>

        <div class="form-group row" style="display: block;    margin: auto;text-align: center;">
          <div style="margin: auto;
    width: 100%;
    font-size: 22px;
    font-weight: 700;">
            Accessories
          </div>
          <div style="text-align: center;
    font-size: 12px;">(Accessories in stock)
          </div>
          <div class="row" style="border: 1px solid rgb(189 189 189);
    padding: 6px 0px 6px 0px;
    margin-bottom: 5px;    margin-left: 0px;
    margin-right: 0px;">
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
            <button class="button btn btn-primary form-control" (click)="onSubmit()">Edit booking</button>
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
      font-weight: 500;
    }

    .start {
      color: green;
    }

    .end {
      color: darkred;
    }
    hr{
      border-color: #5a5a5a;
    }

    .endtext {
      color: black;
    }

    .time {
      font-weight: 500;
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

  @Input()
  adminView: boolean;

  booking: Booking;
  now;
  ngbModalOptions;

  accessories;
  bookings;

  lateReturn;
  fullDay;

  startDate;
  endDate;

  dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  startFormatted;
  endFormatted;

  bookingsSub;
  accessorySub;

  reloadPage;

  constructor(private calendar: NgbCalendar, public userService: UserService, private activeModal: NgbActiveModal,
              public currencyService: CurrencyService, public bookingService: BookingService,  private modalService: NgbModal,
              private router: Router, private carService: CarService, public toolService: ToolsService) {



    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

  }

  getAmountofdays(): number {

    const start = this.startDate.getTime();
    const end = this.endDate.getTime();

    let value = (( end - start ) / 1000 / 60 / 60 / 24) + 1;

    if ((!this.fullDay && !this.lateReturn) || this.nextDayBooked()){
      value = value - 0.5;
    }

    if (this.lateReturn && !this.nextDayBooked()){
      value = value + 0.1;
    }

    return value;
  }

  getTotalPrice(): string {
    return this.currencyService.FormatValue(this.getAmountofdays() * this.booking.carData.Cost);
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

    this.fullDay = this.booking.fullDay;
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

    this.bookingService.EditBooking(this.booking.ID, remove, this.accessories, this.lateReturn, this.fullDay, data => {
      if (!this.adminView){
        this.bookingService.GetUsersBookings();
      }
      this.reloadPage.emit(true);

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
