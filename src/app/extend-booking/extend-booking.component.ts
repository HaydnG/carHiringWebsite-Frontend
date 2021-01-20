import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {MatSlider, MatSliderChange} from '@angular/material/slider';
import {ExtensionPaymentComponent} from '../extension-payment/extension-payment.component';

@Component({
  selector: 'app-extend-booking',
  template: `


    <div class="modal-header" xmlns="http://www.w3.org/1999/html">

      <div class="col">
        <h5 class="modal-title row" id="exampleModalLabel" style="text-align: center;
        width: 93%;
        font-size: 30px;">Extend Booking</h5>
        <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>

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
              {{this.endFormatted}} - <span
              class="time end">{{this.toolService.getTimeString(this.booking.fullDay, this.booking.lateReturn, false)}}</span>
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
              <div class="col">PerDay: <strong>{{this.currencyService.FormatValue(this.booking.carData.Cost)}}</strong></div>
            </div>
            <div class="row">
              <div class="col">Total Days: <strong>{{this.booking.bookingLength}}</strong></div>
              <div class="col">Total Cost: <strong>{{this.currencyService.FormatValue(this.booking.totalCost)}}</strong></div>
            </div>

            <hr>
            <div style="    text-align: center;margin-top: 7px;">
              <div style=" margin-left: 5px;display: inline;font-weight: 600;">Pickup: 8:00am</div>
            </div>
            <div style="    text-align: center;margin-top: 7px;">
              <div style=" margin-left: 5px;display: inline;font-weight: 600;">
                Return: {{this.toolService.getTimeString(this.booking.fullDay, this.booking.lateReturn, this.nextDayBooked())}}
              </div>

            </div>
          </div>
        </div>

        <div class="row">
          <div style="    margin: auto;
    width: 100%;
    font-size: 22px;
    font-weight: 500;
    text-align: center;">
            Extension Options
          </div>

          <div style="border: 1px solid rgb(189 189 189);
        padding: 6px 8px 6px 8px;
        margin-bottom: 5px;width: 100%;">
            <div class="row hidden" style="margin: auto;">
              <div class="col" style="    display: flex;">
                <div class="col-7 paymentrow">
                  <div class="row payment">
                    Per Day:
                  </div>
                  <div class="row payment">
                    Old Cost:
                  </div>
                  <div class="row payment">
                    Extension:
                  </div>
                  <div class="row payment mb-4"></div>
                  <div class="row payment">
                    New Cost:
                  </div>
                </div>
                <div class="col-5 paymentrow" style="    padding: 0px;">
                  <div class="row payment">
                    <span class="money"> {{this.currencyService.FormatValue(this.booking.carData.Cost)}}</span>
                  </div>
                  <div class="row payment">
                    <span class="money"> {{this.currencyService.FormatValue(this.booking.totalCost)}}</span>
                  </div>
                  <div class="row payment calc">
                <span class="" style="color: #58b360"> +{{this.currencyService.FormatValue(this.booking.carData.Cost)}}
                  x {{this.days + this.getExtensionDays()}}</span>
                  </div>
                  <div class="row payment" style="color: #58b360">
                    {{this.currencyService.FormatValue(this.booking.carData.Cost * (this.days + this.getExtensionDays()))}}
                  </div>
                  <div class="row payment">
                    <span class="money"
                          style="    margin-top: 4px;"> {{this.currencyService.FormatValue(this.booking.carData.Cost * (this.booking.bookingLength + (this.days + this.getExtensionDays())))}}</span>
                  </div>
                </div>
              </div>
              <div class="col-7" style="    display: flex;">
                <div class="col-6 paymentrow">
                  <div class="row payment">
                    Original Booking:
                  </div>
                  <div class="row payment">
                    Extension:
                  </div>
                  <div class="row payment">
                    Total Days:
                  </div>
                  <div class="row payment mb-4"></div>
                  <div class="row payment">
                    Amount Paid:
                  </div>
                </div>
                <div class="col-6 paymentrow">
                  <div class="row payment">
                <span
                  class="money"> {{this.booking.bookingLength}}
                  day(s)</span>
                  </div>
                  <div class="row payment">
                    <span class="money" style="color: #58b360"> {{this.days + this.getExtensionDays()}} day(s)</span>
                  </div>
                  <div class="row payment">
                    <span class="money"> {{this.toolService.round(this.booking.bookingLength + this.days + this.getExtensionDays())}} day(s)</span>
                  </div>
                  <div class="row payment mb-4"></div>
                  <div class="row payment">
                    <span class="money"> {{this.currencyService.FormatValue(this.booking.amountPaid)}}</span>
                  </div>
                </div>
              </div>
            </div>
            <hr style="border-color: white">
            <div class="row" [class.markDisabled]="this.days === 0">
              <div class="col">
                <div class="row" style="text-align: left;
    margin: 0px 0px 0px 0px;">
                  <div class="col">

                  </div>
                </div>
                <div class="row" style="padding-left: 15px;
    padding-right: 0px;
    text-align: left;
    margin: 2px 25px 10px 14px;">
                  <div class="col" style="padding: 0px">
                    <div class="row">
                      <div class="col-7">
                        <div class="row">
                          Selected Extension:
                        </div>
                        <div class="row mb-4"  *ngIf="this.days === 0"></div>
                        <div class="row" *ngIf="this.days !== 0" style="margin-bottom: 4px">
                          <span *ngIf="this.fullDay" class=""> Full Day:</span>
                          <span *ngIf="this.lateReturn"
                                class=""> Late Return:</span>
                        </div>

                      </div>
                      <div class="col">
                        <div class="row">
                          <span style="font-weight: 500; font-size: 15px">{{this.days}} day(s)</span>
                        </div>
                        <div class="row mb-4"  *ngIf="this.days === 0"></div>
                        <div class="row"  *ngIf="this.days !== 0" style="margin-bottom: 4px">
                          (+{{this.toolService.getExtensionDays(this.fullDay, this.lateReturn, false)}})
                        </div>
                      </div>

                    </div>


                  </div>
                  <div class="col" style="padding: 0px">
                    <div class="row">
                      <div class="col">
                        New Return:
                      </div>
                      <div class="col">
                        {{this.dayNames[this.newEnd.getDay()]}}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col"  style="color: #009900; font-weight: 500; font-size: 15px">
                        {{this.newEndFormatted}} -
                      </div>
                      <div class="col" style="    padding: 0px 0px 0px 0px;
    margin-left: -6px;">
                        <span
                          class="time"
                          style="color: #009900" *ngIf="this.days ===0">{{this.toolService.getTimeString(this.booking.fullDay, this.booking.lateReturn, false)}}</span>
                        <span
                          class="time"
                          style="color: #009900" *ngIf="this.days !==0">{{this.toolService.getTimeString(this.fullDay, this.lateReturn, !this.allowExtension)}}</span>
                      </div>
                    </div>
                  </div>


                </div>

                <ng-template #nextday>These options are only availble if the next day is not booked</ng-template>
                <div class="row" placement="bottom" [disableTooltip]="this.allowExtension || this.days === 0" [class.markDisabled]="this.days === 0 || !this.allowExtension"
                     [ngbTooltip]="nextday">
                  <div [disableTooltip]="!this.allowExtension || this.days === 0" placement="bottom" class="col" style="    text-align: center;margin-top: 7px;"
                       [ngbTooltip]="fullDayTIPbooking">
                    <ng-template #fullDayTIPbooking>Increase last day to the full duration</ng-template>
                    <input [disabled]="this.lateReturn || !this.allowExtension || this.days === 0" id="checkbox_fullDay_booking" type="checkbox"
                           [(ngModel)]="this.fullDay">
                    <label class="checklabel" for="checkbox_fullDay_booking" style="    margin-bottom: 0px;">Full Day</label>
                  </div>
                  <div [disableTooltip]="!this.allowExtension || this.days === 0" placement="bottom" class="col" style="    text-align: center;margin-top: 7px;"
                       *ngIf="this.userService.repeat" [ngbTooltip]="tipContentbooking">
                    <input [disabled]="!this.allowExtension" id="checkbox_late_booking" type="checkbox" [(ngModel)]="this.lateReturn">
                    <ng-template #tipContentbooking>This option is only for repeat customers.
                      Option to drop keys through letterbox after hours.
                    </ng-template>
                    <label class="checklabel" for="checkbox_late_booking" style="    margin-bottom: 0px;">Late Return <span
                      style="    font-size: 11px;
    color: green;">(Repeat Only)</span></label>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <span class="text-small" style="    position: absolute;
    top: 29px;
    left: 19px;">0</span>
                    <mat-slider  style="width: 100%;    margin-bottom: -10px;"
                                [displayWith]="formatLabel"
                                thumbLabel
                                tickInterval="1"
                                step="1"
                                min="0"
                                max="{{this.maxDays}}"
                                [(ngModel)]="this.days"
                                (input)="this.updateDays($event)"></mat-slider>
                    <span class="text-small" style="    position: absolute;
    top: 29px;
    right: 20px;">{{this.maxDays}}</span>
                  </div>
                </div>
                <div class="row" style="    margin-top: 10px;margin-left: -2px;
    margin-left: -7px;">
                  <div class="col">
                    Select days
                  </div>

                </div>
              </div>

            </div>


          </div>


        </div>

        <HR >
        <div style="font-size: 13px;
        color: #bf5c5c;
        text-align: center;" class="row" *ngIf="this.nextDayBooked() && this.maxDays === 14"> After the maximum extension of 14 Days, there is another booking. This means that if you require an extension of 14 days, it will need an early return at 01:00pm.
        </div>
        <div style="font-size: 13px;
        color: #bf5c5c;
        text-align: center;    display: block;" class="row" *ngIf="!this.nextDayBooked() && this.maxDays !== 14 && this.maxDays !==0"> The booking extension is limited to <span style="font-weight: 500; color: green">{{this.maxDays}} day(s)</span>
          due to the car having other bookings. If max extension is selected, the vehicle will need an early return of
          <span style="font-weight: 500; color: green">01:00pm</span>
        </div>
        <div style="font-size: 13px;
        color: #bf5c5c;
        text-align: center;    display: block;" class="row" *ngIf="!this.nextDayBooked() && this.maxDays !== 14 && this.maxDays ===0"> No extension options are available for this booking, due to other bookings on this vehicle.
        </div>
        <div style="font-size: 13px;
        color: #bf5c5c;
        text-align: center;    display: block;" class="row" *ngIf="!this.nextDayBooked() && this.maxDays === 14"> Currently you can extend your booking up to a maximum of 14 day(s)
        </div>
        <div style="font-size: 13px;
        color: #bf5c5c;
        text-align: center;" class="row" *ngIf="!this.nextDayBooked() && this.booking.lateReturn"> Because you previously paid for a late return, the difference will be made up in the costs.
        </div>
        <div class="form-group row" style="margin-top: 10px;">
          <div class="col">
            <button [disabled]="this.days === 0" class="button btn btn-primary form-control" (click)="onSubmit()">Extend Booking <span *ngIf="this.days !==0">- {{this.days}} day(s) - {{this.currencyService.FormatValue(this.booking.carData.Cost * (this.days + this.getExtensionDays()))}}</span></button>
          </div>
        </div>
      </div>
    </div>



  `,
  styles: [`
    .hidden{
      opacity: 0.5;
      transition: 0.4s;
    }
    .hidden:hover{
      opacity: 1;
    }

  .markDisabled{
    opacity: 0.5;
  }

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
export class ExtendBookingComponent implements OnInit, OnDestroy {



  @Input()
  adminView: boolean;

  booking: Booking;
  now;
  ngbModalOptions;

  accessories;
  bookings;

  lateReturn;
  fullDay;
  allowExtension = true;

  startDate;
  endDate;

  dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  startFormatted;
  endFormatted;

  newEnd;
  newEndFormatted;

  bookingsSub;
  accessorySub;

  reloadPage;
  maxDays = 0;
  days = 0;
  openPayment = false;

  constructor(private calendar: NgbCalendar, public userService: UserService, private activeModal: NgbActiveModal,
              public currencyService: CurrencyService, private bookingService: BookingService,  private modalService: NgbModal,
              private router: Router, private carService: CarService, public toolService: ToolsService) {



    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

  }

  formatLabel(value: number): string {
    return value + '';
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
  }

  ngOnInit(): void {
    this.newEnd = new Date();

    this.bookingsSub = this.carService.carBookingsChange.subscribe(data => {
      this.bookings = data;
      if (this.openPayment){
        const payment = this.modalService.open(ExtensionPaymentComponent, this.ngbModalOptions);
        payment.componentInstance.bookingData = this.booking;
      }


    });

    this.carService.LoadBookings(this.booking.finish + ((60 * 60 * 24) * 15), this.booking.finish + ((60 * 60 * 24) * 15), this.booking.carData.ID);

    this.bookingService.CountExtensionDays(this.booking.ID, data => {
      console.log(data);
      this.maxDays = data.days;
      this.days = data.days;
      this.newEnd = new Date(this.endDate);
      this.newEnd.setDate(this.endDate.getDate() + data.days);
      this.newEndFormatted = this.newEnd.toISOString().split('T')[0];
      this.checkAllowedExtension();
    });
    this.fullDay = this.booking.fullDay;
    this.lateReturn = this.booking.lateReturn;
    this.startDate = new Date(this.booking.start * 1000);
    this.endDate = new Date(this.booking.end * 1000);

    this.startFormatted = this.startDate.toISOString().split('T')[0];
    this.endFormatted = this.endDate.toISOString().split('T')[0];

    this.newEnd = new Date(this.endDate);
    this.newEnd.setDate(this.endDate.getDate() + 14);
    this.newEndFormatted = this.newEnd.toISOString().split('T')[0];
    this.checkAllowedExtension();
  }

  onSubmit(): void {

    this.bookingService.ExtendBooking(this.booking.ID, this.days, this.fullDay, this.lateReturn, data => {
      if (!this.adminView){
        this.openPayment = true;
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

  updateDays($event: MatSliderChange): void {
    this.days = $event.value;
    this.newEnd = new Date(this.endDate);
    this.newEnd.setDate(this.endDate.getDate() + this.days);
    this.newEndFormatted = this.newEnd.toISOString().split('T')[0];

    this.checkAllowedExtension();
  }

  checkAllowedExtension(): void{
    if (this.maxDays < 14 && this.days === this.maxDays){
      this.allowExtension = false;
    }else if (this.maxDays === 14 && this.maxDays === this.days){
      if (this.nextDayBooked()){
        this.allowExtension = false;
      }else {
        this.allowExtension = true;
      }
    }else if (this.days !== 0){
      this.allowExtension = true;
    }else if (this.days === 0){
      this.allowExtension = false;
    }
  }

  getExtensionDays(): number{
    if (this.days === 0){
      return 0;
    }

    if (!this.allowExtension){
      if (this.booking.lateReturn){
        return -0.6;
      }
      if (this.booking.fullDay){
        return -0.5;
      }
      return -0.5;
    }

    if (this.booking.lateReturn === this.lateReturn && this.fullDay === this.booking.fullDay){
      return 0;
    }


    let value = 0 ;

    if (this.booking.lateReturn){
      value += -0.6;
    }else if (this.booking.fullDay){
      value += -0.5;
    }

    if (this.lateReturn){
      value += 0.6;
    }else if (this.fullDay){
      value += 0.5;
    }

    return value;

  }
}
