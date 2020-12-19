import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyService} from '../services/currency/currency.service';


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
        <div class="row" style="text-align: center; margin-top: 15px; margin-bottom: 10px">
          <div class="col">
            Total Cost: <span class="money">{{this.currencyService.FormatValue(this.bookingData.totalCost)}}</span>
          </div>

          <div class="col">
            Amount Paid: <span class="money">{{this.currencyService.FormatValue(this.bookingData.amountPaid)}}</span>
          </div>
        </div>

        <div class="row form-group" style="    width: 80%;
    margin: auto;">
          <div class="col">
            <input id="nothing" class="form-control" placeholder="Payment details (Fake for example)">
          </div>

        </div>
        <div class="row form-group" style="    width: 80%;
             margin: auto;">
          <div class="col">
            <input id="nothing" class="form-control" placeholder="Payment details (Fake for example)">
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
          top: 12%;
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


  bookingData;
  ngbModalOptions;

  startDate: Date;
  endDate: Date;


  startFormatted: string;
  endFormatted: string;

  constructor(private activeModal: NgbActiveModal, public currencyService: CurrencyService,
              private modalService: NgbModal) {


    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

  }

  ngOnInit(): void {
    console.log(this.bookingData);

    this.startDate = new Date(this.bookingData.start * 1000);
    this.endDate = new Date(this.bookingData.end * 1000);

    this.startFormatted = this.startDate.toISOString().split('T')[0];
    this.endFormatted = this.endDate.toISOString().split('T')[0];

  }



  closePayment(): void{
    this.activeModal.dismiss();
  }

  onSubmit() {

  }
}
