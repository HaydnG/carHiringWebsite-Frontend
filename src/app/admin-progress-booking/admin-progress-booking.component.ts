import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

@Component({
  selector: 'app-admin-progress-booking',
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
                  <div class="row" style="padding: 40px 30px 10px 30px;font-weight: 500;font-size: 17px;">
                    <div *ngIf="this.adminBooking.booking.awaitingExtraPayment  &&
          this.adminBooking.booking.processID >= this.bookingService.statuses.BookingConfirmed && !this.failed;else progress"  >
                      <div *ngIf="this.adminBooking.booking.isRefund; else isNotRefund">
                        {{this.adminBooking.user.FirstName}} {{this.adminBooking.user.Names}} is Due a Refund of
                        ({{this.currencyService.FormatValue(this.adminBooking.booking.amountPaid - this.adminBooking.booking.totalCost)}})
                        on <span *ngIf="this.adminBooking.booking.processID <= this.bookingService.statuses.BookingConfirmed">Collection</span>
                        <span *ngIf="this.adminBooking.booking.processID >= this.bookingService.statuses.CollectedBooking">Return</span>

                      </div>
                      <ng-template #isNotRefund>
                        {{this.adminBooking.user.FirstName}} {{this.adminBooking.user.Names}} is Required to Pay
                        ({{this.currencyService.FormatValue(this.adminBooking.booking.totalCost - this.adminBooking.booking.amountPaid)}}) Extra
                        on <span *ngIf="this.adminBooking.booking.processID <= this.bookingService.statuses.BookingConfirmed">Collection</span>
                          <span *ngIf="this.adminBooking.booking.processID >= this.bookingService.statuses.CollectedBooking">Return</span>
                      </ng-template>
                    </div>
                    <ng-template #progress>
                      <div *ngIf="!this.failed">
                        Are you sure you want to progress this booking?
                      </div>
                      <div *ngIf="this.failed">
                        Are you sure you want to mark this booking as failed <span *ngIf="this.adminBooking.booking.processID <= this.bookingService.statuses.BookingConfirmed">Collection</span>
                        <span *ngIf="this.adminBooking.booking.processID >= this.bookingService.statuses.CollectedBooking">Return</span>? <br>
                        This action will blackList the user.
                      </div>


                    </ng-template>
                  </div>
                </div>

              </div>
              <div style="    border-top: 1px solid #dee2e6;
    padding: 20px;">

                <div class="row" *ngIf="!this.failed">
                  <div *ngIf="this.adminBooking.booking.awaitingExtraPayment && this.adminBooking.booking.processID !== this.bookingService.statuses.CanceledBooking &&
          this.adminBooking.booking.processID >= this.bookingService.statuses.BookingConfirmed;"  class="col" style="    padding: 0px;">
                    <div *ngIf="this.adminBooking.booking.isRefund; else isNotRefund">
                      <button (click)="this.processExtraPayment()" class="button btn form-control extraPayment">
                        ({{this.currencyService.FormatValue(this.adminBooking.booking.amountPaid - this.adminBooking.booking.totalCost)}}) Refund Given on <span *ngIf="this.adminBooking.booking.processID <= this.bookingService.statuses.BookingConfirmed">Collection</span>
                        <span *ngIf="this.adminBooking.booking.processID >= this.bookingService.statuses.CollectedBooking">Return</span>
                      </button>
                    </div>
                    <ng-template #isNotRefund>
                      <button (click)="this.processExtraPayment()" class="button btn form-control extraPayment">
                        ({{this.currencyService.FormatValue(this.adminBooking.booking.totalCost - this.adminBooking.booking.amountPaid)}}) Payment Accepted on <span *ngIf="this.adminBooking.booking.processID <= this.bookingService.statuses.BookingConfirmed">Collection</span>
                        <span *ngIf="this.adminBooking.booking.processID >= this.bookingService.statuses.CollectedBooking">Return</span>
                      </button>
                    </ng-template>
                  </div>
                </div>
                  <div class="row" >
                    <div  *ngIf="this.failed"  class="col" style="padding: 0px;">
                      <button  (click)="this.progressBooking(true)" class="button btn form-control deny">
                        Failed <span *ngIf="this.adminBooking.booking.processID === this.bookingService.statuses.CollectedBooking">Return</span>
                        <span *ngIf="this.adminBooking.booking.processID === this.bookingService.statuses.BookingConfirmed">Collection</span>
                      </button>
                    </div>
                    <div *ngIf="!this.failed"  class="col" style="padding: 5px 0px 0px 0px;">
                      <button (click)="this.progressBooking(false)" class="button btn form-control confirm">
                        <span *ngIf="this.adminBooking.booking.processID === this.bookingService.statuses.AwaitingConfirmation">Confirm Booking</span>
                        <span *ngIf="this.adminBooking.booking.processID === this.bookingService.statuses.BookingConfirmed">Confirm Customer Collection</span>
                        <span *ngIf="this.adminBooking.booking.processID === this.bookingService.statuses.CollectedBooking">Confirm Customer Return</span>
                        <span *ngIf="this.adminBooking.booking.processID === this.bookingService.statuses.ReturnedBooking">Complete Booking</span>
                      </button>
                    </div>
                </div>

            </div>
          </div>
        </div>
  `,
  styles: [`
    .extraPayment {
      background-color: #6c3aa2;
      color: #dbdbdb;
      border-color: #5d318c;
    }
    .confirm {
      background-color: #64a549;
      color: #f6f6f6;
      border-color: #43772e;
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

    .deny {
      background-color: #693030;
      color: #dbdbdb;
      border-color: #5a2222;
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
export class AdminProgressBookingComponent implements OnInit {


  @Input()
  adminBooking: AdminBooking;

  ngbModalOptions;

  @Input()
  failed;

  @Output()
  reloadPage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              private adminService: AdminService, public bookingService: BookingService, private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {

  }

  progressBooking(failed: boolean): void {
    this.adminService.ProgressBooking( failed, this.adminBooking.booking.ID, data => {
      this.reloadPage.next(true);
      this.activeModal.dismiss();
    });
  }

  closeBooking(): void{
    this.activeModal.dismiss();
  }

  processExtraPayment(): void {

  }

  grantRefund(): void {

  }
}
