import {Component, EventEmitter, Input, OnInit, Output, NgZone, ViewChild} from '@angular/core';
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
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-admin-refund-response',
  template: `
        <div >
          <div class="modal-dialog" style="    margin: 0px;">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="    font-size: 15px;
    font-weight: 500;">Admin Booking Progression Confirmation</h5>
                <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="col">
                  <div style="position: absolute;
                      right: 5px;">BookingID: <span style="font-weight: bold">{{this.adminBooking.booking.ID}} </span>
                  </div>
                  <div class="row" style="padding: 40px 30px 10px 30px;font-weight: 600;font-size: 17px;">
                    <div class="col" style="margin: auto;
    text-align: center;">
                      Refund Query of ({{this.currencyService.FormatValue(this.adminBooking.booking.amountPaid)}})<br>How should we respond?
                    </div>
                  </div>
                </div>
                <hr>
                <label for="exampleFormControlTextarea1">Query Response text</label>
                <textarea style="max-height: 200px;
    background-color: #ffffff08;
    color: #dadbdb;" [(ngModel)]="this.response" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div style="    border-top: 1px solid #dee2e6;
    padding: 20px;">

                <div class="row" >
                  <div  class="col" style="    padding: 0px;">
                      <button (click)="this.processRefund(false)" class="button btn form-control deny">
                        Deny Refund
                      </button>
                  </div>
                  <div  class="col" style="    padding: 0px;">
                    <button (click)="this.processRefund(true)" class="button btn form-control accept">
                      Accept Refund
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
  `,
  styles: [`
    .deny {
      background-color: #7e2a2a;
      color: #f6f6f6;
      border-color: #5b1e1e;
    }

    .accept {
      background-color: #4e8836;
      color: #f6f6f6;
      border-color: #3c672a;
    }

    .modal-content {
      display: contents !important;
    }

    :host {
      padding: 0px;
      margin: 0px;
      width: 98% !important;
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

    img {
      width: 100%;
    }

    :host {
      width: 90%;
      margin: 5px auto;
    }
  `]
})
export class AdminRefundResponseComponent implements OnInit {

  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              private adminService: AdminService, public bookingService: BookingService, private activeModal: NgbActiveModal,
              private ngZone: NgZone) {

  }


  @Input()
  adminBooking: AdminBooking;
  response = '';

  ngbModalOptions;

  size = '16px';

  @Output()
  reloadPage: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {

  }

  triggerResize(): void {

  }

  closeBooking(): void{
    this.activeModal.dismiss();
  }

  processRefund(accept: boolean): void {
    this.adminService.ProcessRefund(accept, this.adminBooking.booking.ID, this.response, data => {
      this.reloadPage.next(true);
      this.activeModal.dismiss();
    });
  }
}
