import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyService} from '../services/currency/currency.service';
import {BookingService} from '../services/booking/booking.service';
import {Booking} from '../services/booking/Booking';
import {ToolsService} from '../services/tools/tools.service';


@Component({
  selector: 'app-booking-details',
  template: `
    <div class="modal-header" xmlns="http://www.w3.org/1999/html">
      <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;
    width: 93%;
    font-size: 30px;">Details</h5>
      <button type="button" class="close" (click)="this.closeDetails()" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
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
              {{this.endFormatted}} - <span class="time end">{{this.toolService.getTimeString(this.bookingData.fullDay, this.bookingData.lateReturn, false)}}</span>
            </div>
          </div>
        </div>
        <HR>
        <div class="row" style="text-align: center;">
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
    margin-bottom: 9px;">Accessories
                <HR>
              </h4>
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
              <div class="row payment"></div>
              <div class="row payment"></div>
              <div class="row payment">
                Total Cost:
              </div>
            </div>
            <div class="col-5 paymentrow">
              <div class="row payment">
                <span class="money"> {{this.currencyService.FormatValue(this.bookingData.perDay)}}</span>
              </div>
              <div class="row payment calc">
                <span class=""> {{this.currencyService.FormatValue(this.bookingData.perDay)}}
                  x {{this.bookingData.bookingLength}}</span>
              </div>
              <div class="row payment"></div>
              <div class="row payment"></div>
              <div class="row payment">
                <span class="money"> {{this.currencyService.FormatValue(this.bookingData.totalCost)}}</span>
              </div>
            </div>
          </div>
          <div class="col-7" style="    display: flex;">
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
                <span
                  class="money"> {{this.toolService.round(this.bookingData.bookingLength - this.toolService.getExtensionDays(this.bookingData.fullDay, this.bookingData.lateReturn, false))}}
                  day(s)</span>
              </div>
              <div class="row payment calc">
                <span *ngIf="this.bookingData.fullDay" class=""> Full Day</span>
                <span *ngIf="this.bookingData.lateReturn"
                      class=""> Late Return</span>(+{{this.toolService.getExtensionDays(this.bookingData.fullDay, this.bookingData.lateReturn, false)}})
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
      </div>

    </div>

  `,
  styles: [`
    .calc{
      font-weight: 500;
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
      font-weight: 500;
      font-size: 16px;
    }

    .accessory{
      text-align: center;
      width: 140px;
      margin: auto;
    }
        .header{
          font-weight: 500;
        }

        .time{
          font-weight: 500;
          font-size: 14px;
          position: relative;
          left: 3px;
          line-height: 25px;
        }

        hr{
          border-color: #5a5a5a;
          margin: 2px 0px 2px 0px;
        }
        .start{
          color: green;
        }
        .end{
          color: darkred;
        }
        .dataTag{
          font-size: 14px;
          font-weight: 500;
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
export class DetailsComponent implements OnInit {


  bookingData: Booking;
  ngbModalOptions;

  startDate: Date;
  endDate: Date;


  startFormatted: string;
  endFormatted: string;

  constructor(private activeModal: NgbActiveModal, public currencyService: CurrencyService,
              private modalService: NgbModal, private bookingService: BookingService, public toolService: ToolsService) {


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


  closeDetails(): void{
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    this.bookingService.MakePayment(this.bookingData.ID, data => {
      this.activeModal.dismiss();
      this.bookingService.GetUsersBookings();

    });
  }
}
