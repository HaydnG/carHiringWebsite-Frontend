import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Car} from '../services/car/Car';
import {Router} from '@angular/router';
import {Booking} from '../services/booking/Booking';
import {CurrencyService} from '../services/currency/currency.service';
import {PaymentComponent} from '../payment/payment.component';

@Component({
  selector: 'app-booking-card',
  template: `
      <div class="row">
        <div class="col-12 booking">
            <div class="background"></div>
            <div style="position: relative;top: -120px;">
              <div class="row" style="padding: 0px 20px 0px 10px;">
                <div class="col-6 titleTag" style="    padding: 0px 0px 0px 13px;   font-weight: 800;">Model: <span class="dataTag"> {{this.booking.carData.CarType.Description}}</span></div>
                <div class="col-5 titleTag" style="    padding: 0px;     font-weight: 800;   padding-left: 5px;">GearType: <span class="dataTag">{{this.booking.carData.GearType.Description}}</span></div>
              </div>
              <hr>
              <div class="row" style="padding: 0px 25px 5px 25px;">
                <div style="position: absolute;
                    right: 5px;">OrderID: <span style="font-weight: bold">{{this.booking.ID}} </span>
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
                        <div class="row payment"> </div>
                        <div class="row payment"> </div>
                        <div class="row payment">
                          Total Cost:
                        </div>
                      </div>
                      <div class="col-5 paymentrow">
                        <div class="row payment">
                          <span class="money"> {{this.currencyService.FormatValue(this.booking.carData.Cost)}}</span>
                        </div>
                        <div class="row payment"></div>
                        <div class="row payment"></div>
                        <div class="row payment">
                          <span class="money"> {{this.currencyService.FormatValue(this.booking.totalCost)}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col" style="     padding: 0px 0px 0px 10px;   display: flex;">
                      <div class="col-6 paymentrow">
                        <div class="row payment">
                          Total Days:
                        </div>
                        <div class="row payment"></div>
                        <div class="row payment">
                          Amount Paid:
                        </div>
                      </div>
                      <div class="col-6 paymentrow">
                        <div class="row payment">
                          <span class="money"> {{this.booking.bookingLength}} day(s)</span>
                        </div>
                        <div class="row payment"></div>
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
                  <div class="row" *ngIf="this.booking.accessories.length > 0">
                    <div class="col" style="display: contents;">
                      <div class="accessory" *ngFor="let object of this.booking.accessories">
                        {{object.Description}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class=".col-auto col-6" style="padding: 0px; min-width: 330px !important;height: 41px;">
                    <button style="width: 20%;    height: 100%" class="button btn btn-danger form-control" (click)="this.onSubmit()" >Cancel</button>
                    <button style="width: 30%;    height: 100%" class="button btn btn-success form-control" (click)="this.onSubmit()" >EDIT</button>
                    <button style="width: 50%;    font-size: 104%;
    padding: 0px;    height: 100%" *ngIf="this.booking.processID === 1" class="button btn btn-primary form-control" (click)="this.onSubmit()" >Make payment ({{this.currencyService.FormatValue(this.booking.totalCost)}})</button>
                    <button style="width: 50%;    height: 100%"  *ngIf="this.booking.processID > 1"class="button btn btn-info form-control" >Request help</button>
                </div>
              </div>

            </div>


        </div>
      </div>
  `,
  styles: [`
    .paymentrow {
      padding: 0px 0px 0px 8px;
    }
    .accessory{
      text-align: center;
      width: 80px;
      margin: auto;
      font-size: 15px;
    }
    .dataTag{
      font-size: 15px;
      font-weight: bold;
    }
    .titleTag{
      font-size: 15px;
    }
    .payment{
      font-weight: 500;
    }
    .money{
      font-weight: bold;
      font-size: 14px;
    }
    .borderB{
      border: 1px solid rgb(191 191 191);
      border-radius: 5px;
    }

    .col-auto{
      min-width: 283px !important;
    }
    .day{
      margin-left: 5px;
      font-weight: 500;
    }
    hr{
      margin: 2px 0px 2px 0px;
    }

    .dates{
      font-weight: 500;
      min-width: 195px;
    }

    .header{
      font-weight: bold;
    }
    .start{
      color: green;
    }
    .end{
      color: darkred;
    }
    .endtext{
      color: black;
    }
    .time{
      font-weight: bold;
      font-size: 14px;
      position: relative;
      left: 3px;
      line-height: 21px;
    }

    .booking{
      border: 2px solid rgb(0 0 0);
      border-radius: 10px;
      overflow: hidden;
      padding: 0px;
      height: 178px;
      background-color: #dcdcdc;
    }

    @media screen and (max-width: 818px) {
      .booking{
        height: 260px !important;
      }
    }

    @media screen and (max-width: 682px) {
      .booking{
        height: 301px !important;
      }
    }
    @media screen and (max-width: 418px) {
      .booking{
        height: 324px !important;
      }
    }



    .background{
      background-image: url(http://5.70.170.197:8080/cars/car1.jpg), linear-gradient(to bottom, #dcdcdce8, #dcdcdc);
      background-blend-mode: hue;
      background-size: cover;
      background-position-y: -122px;
      height: 122px;
      position: relative;
      min-width: 600px;
    }

    img{
      width: 100%;
    }

    :host{
      width: 90%;
      margin: 5px auto;
    }
  `]
})
export class BookingCardComponent implements OnInit {

  dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  @Input()
  booking: Booking;

  startDate;
  endDate;

  startFormatted;
  endFormatted;

  ngbModalOptions;

  constructor(private router: Router, public currencyService: CurrencyService,private modalService: NgbModal) {
    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
  }

  ngOnInit(): void {
    this.startDate = new Date(this.booking.start * 1000);
    this.endDate = new Date(this.booking.end * 1000);

    this.startFormatted = this.startDate.toISOString().split('T')[0];
    this.endFormatted = this.endDate.toISOString().split('T')[0];
  }

  onSubmit(): void{
    const payment = this.modalService.open(PaymentComponent, this.ngbModalOptions);
    payment.componentInstance.bookingData = this.booking;
  }

}
