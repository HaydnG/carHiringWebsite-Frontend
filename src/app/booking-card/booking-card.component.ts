import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Car} from '../services/car/Car';
import {Router} from '@angular/router';
import {Booking, BookingStatus} from '../services/booking/Booking';
import {CurrencyService} from '../services/currency/currency.service';
import {PaymentComponent} from '../payment/payment.component';
import {BookingService} from '../services/booking/booking.service';
import {DetailsComponent} from '../booking-details/booking-details.component';
import {BookingComponent} from '../booking/booking.component';
import {EditBookingComponent} from '../edit-booking/edit-booking.component';
import {CancelBookingComponent} from '../cancel-booking/cancel-booking.component';
import {BookingHistoryComponent} from '../booking-history/booking-history.component';
import {NavService} from '../services/nav/nav.service';

@Component({
  selector: 'app-booking-card',
  template: `
      <div class="row">
        <div class="col-12 booking">
            <div class="background"></div>
            <div style="position: relative;top: -120px;">
              <div class="row carClick" style="    padding: 0px 20px 1px 10px;
    top: -2px;
    position: relative;" (click)="change(this.booking.carData.ID)">
                <div class="col-4 col-auto" style="    font-weight: 600;">
                  {{this.created | date:'medium'}}
                </div>
                <div class="col-auto titleTag" style="    text-align: center;     margin: auto; min-width: 100px !important;    padding: 0px 0px 0px 13px;     font-weight: 700;"><span class="dataTag">{{this.booking.carData.Description}}</span></div>
                <div class="col-auto titleTag" style="    text-align: center;     margin: auto;   min-width: 100px !important;    padding: 0px 0px 0px 13px;   font-weight: 700;"><span class="dataTag"> {{this.booking.carData.CarType.Description}}</span></div>
                <div class="col-auto titleTag" style="     text-align: center;    margin: auto; min-width: 100px !important;    padding: 0px 0px 0px 13px;     font-weight: 700;"><span class="dataTag">{{this.booking.carData.GearType.Description}}</span></div>

              </div>
              <hr style="margin: -2px 0px 2px 0px;">
              <div class="row" style="padding: 0px 25px 5px 25px;">
                <div style="position: absolute;
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
                    {{this.endFormatted}} - <span class="time end" *ngIf="!this.booking.extension && !this.booking.lateReturn"> At 1:00pm</span>
                    <span class="time end"*ngIf="this.booking.extension && !this.booking.lateReturn"> At 4:00pm <span class="endtext">- Extended booking</span></span>
                    <span class="time end"*ngIf="!this.booking.extension && this.booking.lateReturn"> After 6:00pm <span class="endtext">- Late Return</span></span>
                  </div>
                </div>
              </div>
              <hr>
              <div class="row" style="padding:  0px 18px 0px 18px;">
                <div class="col-6 borderB" style="min-width: 330px !important; text-align: center;">
                  <div class="row" >
                    <div class="col-6 titleTag">Colour: <span class="dataTag">{{this.booking.carData.Colour.Description}}</span></div>
                    <div class="col titleTag">Seats: <span class="dataTag">{{this.booking.carData.Seats}}</span></div>
                  </div>
                  <div class="row">
                    <div class="col-6 titleTag">FuelType: <span class="dataTag">{{this.booking.carData.FuelType.Description}}</span></div>
                    <div class="col titleTag">Size: <span class="dataTag">{{this.booking.carData.Size.Description}}</span></div>
                  </div>
                </div>
                <div class="col-6 col-auto borderB" style="min-width: 330px !important;">
                  <div class="row" style="margin: auto;">
                    <div class="col-5" style="    padding: 0px 0px 0px 0px;    display: flex;">
                      <div class="col-7 paymentrow">
                        <div class="row payment">
                          Per Day:
                        </div>
                        <div class="row payment">
                          Total Cost:
                        </div>
                      </div>
                      <div class="col-5 paymentrow">
                        <div class="row payment">
                          <span class="money"> {{this.currencyService.FormatValue(this.booking.carData.Cost)}}</span>
                        </div>
                        <div class="row payment">
                          <span class="money"> {{this.currencyService.FormatValue(this.booking.totalCost)}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col" style="     padding: 0px 0px 0px 10px;   display: flex;">
                      <div class="col-7 paymentrow" style="    margin-left: 2px;">
                        <div class="row payment">
                          Total Days:
                        </div>
                        <div class="row payment">
                          Amount Paid:
                        </div>
                      </div>
                      <div class="col-5 paymentrow">
                        <div class="row payment">
                          <span class="money"> {{this.booking.bookingLength}} day(s)</span>
                        </div>
                        <div class="row payment">
                          <span class="money"> {{this.currencyService.FormatValue(this.booking.amountPaid)}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div class="row" style="    padding: 2px 18px 18px 18px;">
                <div class="col-auto col-6 borderB" style="min-width: 330px !important;    height: 41px;">
                  <div class="row">
                    <div class="col" *ngIf="this.booking.accessories.length > 0" style="height: 41px;
    display: flex;">
                      <div  class="accessory" *ngFor="let object of this.booking.accessories">
                        {{object.Description}}
                      </div>
                    </div>
                  </div>

                </div>
                <div class=".col-auto col-6" style="padding: 0px; min-width: 330px !important;height: 41px;">
                    <div class="row" style="padding: 2px 16px 0px 17px;
    height: 41px !important;">
                      <div class="col noPad" *ngIf="this.booking.processID !== this.bookingService.statuses.CanceledBooking && this.booking.processID !== this.bookingService.statuses.CompletedBooking">
                        <button (click)="this.cancel()" class="button btn btn-danger form-control bookButton" >Cancel</button>
                      </div>
                      <div class="col noPad">
                        <button  (click)="this.history()" class="button btn history form-control bookButton" >History</button>
                      </div>
                      <div class="col noPad" *ngIf="this.booking.processID !== this.bookingService.statuses.CanceledBooking && this.booking.processID <= this.bookingService.statuses.BookingConfirmed">
                        <button class="button btn btn-success form-control bookButton" (click)="this.edit()" >EDIT</button>
                      </div>
                      <div class="col noPad" *ngIf="this.booking.processID === this.bookingService.statuses.AwaitingPayment && !this.adminView">
                        <button style="font-size: 104%;padding: 0px;" class="button btn btn-primary form-control bookButton" (click)="this.onSubmit()" >Make payment ({{this.currencyService.FormatValue(this.booking.totalCost)}})</button>
                      </div>
                      <div class="col noPad" *ngIf="this.booking.processID > this.bookingService.statuses.AwaitingPayment">
                        <button class="button btn btn-info form-control bookButton" (click)="this.details()">Details</button>
                      </div>

                    </div>

                  </div>
              </div>

            </div>


        </div>
      </div>
  `,
  styles: [`
    .bookButton{
      width: 100%;
      height: 100%;
    }
    .noPad{
      padding: 0px;
    }

    .disabled {
      color: #cbcbcb;
      opacity: 20%;
    }

    .btn-danger {
      color: #fff;
      background-color: #661922;
      border-color: #470e15;
    }

    .btn-success {
      color: #fff;
      background-color: #155423;
      border-color: #0e431a;
    }

    .btn-info {
      color: #fff;
      background-color: #106977;
      border-color: #0a464f;
    }

    .history {
      color: white;
      background-color: #9f5006;
      border-color: #814003;
    }

    .history:hover {
      color: white;
      background-color: #b55700;
    }

    .btn-primary {
      color: #fff;
      background-color: #3268a7;
      border-color: #184270;
    }

    .carClick {
      cursor: pointer;
    }

    .carClick:hover {
      background-blend-mode: color;
      background-color: #a5a5a547;
    }

    .paymentrow {
      padding: 0px 0px 0px 4px;
    }

    .accessory {
      text-align: center;
      width: 80px;
      margin: auto;
      font-size: 15px;
    }

    .dataTag {
      font-size: 15px;
      font-weight: bold;
      color: #cecece;
    }

    .titleTag {
      font-size: 15px;
    }

    .payment {
      font-weight: 500;
    }

    .money {
      font-weight: bold;
      font-size: 13.5px;
      line-height: 21px;
    }

    .borderB {
      border: 1px solid rgb(115 115 115 / 35%);
      border-radius: 5px;
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
      color: #dadada;
    }

    .time {
      font-weight: bold;
      font-size: 14px;
      position: relative;
      left: 3px;
      line-height: 21px;
    }

    .booking {
      border: 2px solid rgb(0 0 0);
      border-radius: 10px;
      overflow: hidden;
      padding: 0px;
      height: 174px;
      background-color: #252a2b;
    }

    @media screen and (max-width: 753px) {
      .booking {
        height: 275px !important;
      }
    }

    @media screen and (max-width: 682px) {
      .booking {
        height: 323px !important;
      }
    }

    @media screen and (max-width: 424px) {
      .booking {
        height: 344px !important;
      }
    }


    .background {
      background-image: url(http://5.70.170.197:8080/cars/car1.jpg), linear-gradient(to bottom, #000000a6, #000000);
      background-blend-mode: soft-light;
      background-size: 100%;
      background-position-y: 500px;
      opacity: 0.15;
      height: 125px;
      position: relative;
      min-width: 600px;
    }


    img {
      width: 100%;
    }

    :host {
      width: 100%;
      margin: 10px auto;
      color: #ffffff99;
    }
  `]
})
export class BookingCardComponent implements OnInit {

  dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


  @Input()
  currentPage: string;
  @Input()
  currentPageID: number;

  @Input()
  booking: Booking;

  @Input()
  adminView;

  startDate;
  endDate;

  startFormatted;
  endFormatted;

  ngbModalOptions;
  created;

  @Output()
  reloadPage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              public bookingService: BookingService, public navService: NavService) {

  }

  ngOnInit(): void {
    this.startDate = new Date(this.booking.start * 1000);
    this.endDate = new Date(this.booking.end * 1000);
    this.created = new Date(this.booking.created * 1000);

    this.startFormatted = this.startDate.toISOString().split('T')[0];
    this.endFormatted = this.endDate.toISOString().split('T')[0];
  }

  onSubmit(): void{

    const booking = this.modalService.open(PaymentComponent, this.ngbModalOptions);
    booking.componentInstance.bookingData = this.booking;
  }

  edit(): void{
    if (this.booking.processID === 11){
      return;
    }

    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

    const booking = this.modalService.open(EditBookingComponent, this.ngbModalOptions);
    booking.componentInstance.booking = this.booking;
    booking.componentInstance.adminView = this.adminView;
    booking.componentInstance.reloadPage = this.reloadPage;
  }

  cancel(): void {
    if (this.booking.processID === 10){
      return;
    }
    const details = this.modalService.open(CancelBookingComponent, this.ngbModalOptions);
    details.componentInstance.booking = this.booking;
  }

  details(): void{
    const details = this.modalService.open(DetailsComponent, this.ngbModalOptions);
    details.componentInstance.bookingData = this.booking;
  }

  history(): void{
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const history = this.modalService.open(BookingHistoryComponent, ngbModalOptions);
    history.componentInstance.booking = this.booking;
  }

  change(ID: number): void {
    this.navService.Navigate(this.currentPage, this.currentPageID, ['car', {id: ID}]);
  }
}
