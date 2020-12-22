import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyService} from '../services/currency/currency.service';
import {BookingService} from '../services/booking/booking.service';
import {Booking} from '../services/booking/Booking';


@Component({
  selector: 'app-payment',
  template: `
    <div class="modal-header" xmlns="http://www.w3.org/1999/html">
      <button type="button" class="close" aria-label="Close" (click)="closePayment()">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="col">
        <div class="row" style="
    text-align: center;"><h1 style="text-align: center;    margin: auto;">Payment</h1></div>
      </div>
      <HR>
    </div>



    <div class="modal-body" style="position: relative;
    flex: 1 1 auto;
    padding: 10px 20px  10px  20px">
      <div class="col">
        <div class="row" style="padding: 5px 25px 5px 25px;">
          <div style="position: absolute; font-size: 14px;
                    right: 5px;">BookingID: <span style="font-weight: bold">{{this.bookingData.ID}} </span>
          </div>
          <div class="col">
            <div class="row header">
              Collection:
            </div>
            <div class="row">
              {{this.startFormatted}} - <span class="time start"> From 08:00AM</span>
            </div>
          </div>
          <div class="col">
            <div class="row header">
              Return:
            </div>
            <div class="row">
              {{this.endFormatted}} - <span class="time end" *ngIf="!this.bookingData.extension && !this.bookingData.lateReturn"> At 1:00pm</span>
                                      <span class="time end"*ngIf="this.bookingData.extension && !this.bookingData.lateReturn"> At 4:00pm</span>
                                      <span class="time end"*ngIf="!this.bookingData.extension && this.bookingData.lateReturn"> After 6:00pm</span>
            </div>
          </div>
        </div>
        <HR>
        <div class="row" style="text-align: center;" >
          <div class="col titleTag">Model: <span class="dataTag"> {{this.bookingData.carData.CarType.Description}}</span></div>
          <div class="col-3 titleTag">Seats: <span class="dataTag">{{this.bookingData.carData.Seats}}</span></div>
          <div class="col titleTag">Colour: <span class="dataTag">{{this.bookingData.carData.Colour.Description}}</span></div>
        </div>
        <div class="row" style="text-align: center;">
          <div class="col titleTag">Fuel Type: <span class="dataTag">{{this.bookingData.carData.FuelType.Description}}</span></div>
          <div class="col titleTag">Gear Type: <span class="dataTag">{{this.bookingData.carData.GearType.Description}}</span></div>
          <div class="col titleTag">Size: <span class="dataTag">{{this.bookingData.carData.Size.Description}}</span></div>
        </div>
        <HR>
        <div class="row" *ngIf="this.bookingData.accessories.length > 0">
          <div class="col">
            <div class="row">
              <h4 style="    text-align: center;
    margin: auto;
    margin-bottom: 9px;">Accessories<HR></h4>
            </div>
            <div class="row" style="    margin-bottom: 5px;">
              <div class="col" style="display: contents;">
                <div class="accessory" *ngFor="let object of this.bookingData.accessories">
                  {{object.Description}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <HR *ngIf="this.bookingData.accessories.length > 0">

        <div class="row" style="margin: auto;">
          <div class="col" style="    display: flex;">
            <div class="col-7 paymentrow">
              <div class="row payment">
                Per Day:
              </div>
              <div class="row payment" style="font-size: 14px;">
                Cost * Days:
              </div>
              <div class="row payment"> </div>
              <div class="row payment"> </div>
              <div class="row payment">
                Total Cost:
              </div>
            </div>
            <div class="col-5 paymentrow">
              <div class="row payment">
                <span class="money"> {{this.currencyService.FormatValue(this.bookingData.carData.Cost)}}</span>
              </div>
              <div class="row payment calc">
                <span class=""> {{this.currencyService.FormatValue(this.bookingData.carData.Cost)}} x {{this.bookingData.bookingLength}}</span>
              </div>
              <div class="row payment"></div>
              <div class="row payment"></div>
              <div class="row payment">
                <span class="money"> {{this.currencyService.FormatValue(this.bookingData.totalCost)}}</span>
              </div>
            </div>
          </div>
          <div class="col" style="    display: flex;">
            <div class="col-6 paymentrow">
              <div class="row payment">
                Days booked:
              </div>
              <div class="row payment">
                Extra:
              </div>
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
                <span class="money"> {{this.getBookingLength()}} day(s)</span>
              </div>
              <div class="row payment calc" >
                <span *ngIf="this.bookingData.extension" class=""> Extension(+0.5)</span>
                <span *ngIf="this.bookingData.lateReturn"class=""> LateReturn(+0.6)</span>
                <span *ngIf="!this.bookingData.lateReturn && !this.bookingData.extension"class=""> 0</span>
              </div>
              <div class="row payment">
                <span class="money"> {{this.bookingData.bookingLength}} day(s)</span>
              </div>
              <div class="row payment"></div>
              <div class="row payment">
                <span class="money"> {{this.currencyService.FormatValue(this.bookingData.amountPaid)}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row form-group" style="    width: 80%;
    margin: auto;">
          <div class="col">
            <input id="nothingOne" class="form-control" placeholder="Payment details (Fake for example)">
          </div>

        </div>
        <div class="row form-group" style="    width: 80%;
             margin: auto;">
          <div class="col">
            <input id="nothingTwo" class="form-control" placeholder="Payment details (Fake for example)">
          </div>

        </div>

        <div class="form-group row" style="margin-top: 10px;">
          <div class="col">
            <button class="button btn btn-primary form-control" (click)="onSubmit()" >Make payment ({{this.currencyService.FormatValue(this.bookingData.totalCost)}})</button>
          </div>
        </div>
      </div>

    </div>

  `,
  styles: [`
    .calc{
      font-weight: bold;
      font-size: 13px;
      line-height: 24px;
    }
    .paymentrow{
      padding: 0px;
    }

    .payment{
      margin: auto;
      padding: 0px;
      height: 24px;
    }

    .money{
      font-weight: bold;
      font-size: 16px;
    }

    .accessory{
      text-align: center;
      width: 140px;
      margin: auto;
    }
        .header{
          font-weight: bold;
        }

        .time{
          font-weight: bold;
          font-size: 14px;
          position: relative;
          left: 3px;
          line-height: 25px;
        }

        hr{
          margin: 2px 0px 2px 0px;
        }
        .start{
          color: green;
        }
        .end{
          color: darkred;
        }
        .close {
          padding: 2px;
          position: absolute;
          right: 5%;
          top: 4%;
          font-size: 28px;
          z-index: 100;
        }

        .dataTag{
          font-size: 14px;
          font-weight: bold;
        }
        .titleTag{
          font-size: 15px;
        }

        .col{
          padding: 4px;
        }
        .col-3{
          padding: 4px;
        }

  `]
})
export class PaymentComponent implements OnInit {


  bookingData: Booking;
  ngbModalOptions;

  startDate: Date;
  endDate: Date;


  startFormatted: string;
  endFormatted: string;

  constructor(private activeModal: NgbActiveModal, public currencyService: CurrencyService,
              private modalService: NgbModal, private bookingService: BookingService) {


    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

  }

  ngOnInit(): void {
    this.startDate = new Date(this.bookingData.start * 1000);
    this.endDate = new Date(this.bookingData.end * 1000);

    this.startFormatted = this.startDate.toISOString().split('T')[0];
    this.endFormatted = this.endDate.toISOString().split('T')[0];

  }

  getBookingLength(): string{
    let length = this.bookingData.bookingLength;

    if (this.bookingData.extension){
      length = length - 0.5;
    }else if (this.bookingData.lateReturn){
      length = length - 0.6;
    }
    return length.toFixed(1);
  }

  closePayment(): void{
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    this.bookingService.MakePayment(this.bookingData.ID, data => {
      this.activeModal.dismiss();
      this.bookingService.GetUsersBookings();

    });
  }
}
