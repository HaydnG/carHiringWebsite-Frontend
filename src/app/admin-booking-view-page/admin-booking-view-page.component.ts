import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CarService} from '../services/car/car.service';
import {AdminService} from '../services/admin/admin.service';
import {NavService} from '../services/nav/nav.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription, timer} from 'rxjs';
import {ToolsService} from '../services/tools/tools.service';
import {BookingStatus} from '../services/booking/Booking';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CancelBookingComponent} from '../cancel-booking/cancel-booking.component';
import {AdminProgressBookingComponent} from '../admin-progress-booking/admin-progress-booking.component';

@Component({
  selector: 'app-admin-booking-page',
  template: `

    <div *ngIf="this.adminBooking !== undefined" class="container-fluid adminPanel">


      <div style="    position: relative;
    color: white;
    font-size: 20px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 100%;
    right: 10px;
    top: 5px;
    text-align: right;">BookingID: {{this.adminBooking.booking.ID}}</div>
      <div (click)="this.navService.Back('/admin/booking')" style="position: relative;
    color: white;
    font-size: 42px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 20px;
    left: 11px;
    top: -18px;">&larr;
      </div>

      <div class="card-header" style="        text-align: center;
      color: white;
      font-size: 36px;
      margin-bottom: 10px;
      padding-bottom: 25px;
      text-decoration: underline;
      text-underline-offset: 1px;line-height: 36px;
  }">
        Admin Booking view
      </div>


      <div class="card-body" style="    padding-top: 5px;">
        <div class="col">
          <div class="row" style="    margin-top: 4px;
    margin-bottom: 6px;">
            <div style="position: absolute;
    left: -10px;
    top: -15px;
    font-size: 15px;
    font-weight: 500;">Booking Length: {{this.adminBooking.booking.bookingLength}} days
            </div>
            <div style="position: absolute;
    right: 0px;
    top: -15px;
    font-size: 15px;
    font-weight: 500;">Collection In: {{this.toolsServies.formatCountdown(this.adminBooking.booking.countdownDate)}}</div>

          </div>

          <div class="row">
            <div class="col" [class.Canceled]="this.adminBooking.booking.processID === this.canceledBookingStatus" [class.Waiting]="this.adminBooking.booking.adminRequired"
                 style="font-size: 20px; font-weight: 500; text-align: center; margin: auto">
              {{this.adminBooking.booking.processName}}
            </div>
          </div>
          <div *ngIf="this.adminBooking.booking.adminRequired" class="row">
            <div class="col" style="color: #0ba90b;font-size: 16px; font-weight: 400; text-align: center; margin: auto">
              Awaiting Admin action
            </div>
          </div>
          <div *ngIf="this.adminBooking.booking.awaitingExtraPayment && this.adminBooking.booking.processID === this.canceledBookingStatus" class="row">
            <div class="col" style="color: #0ba90b;font-size: 16px; font-weight: 400; text-align: center; margin: auto">
              Active Refund Query
            </div>
          </div>
          <div *ngIf="this.adminBooking.booking.awaitingExtraPayment && this.adminBooking.booking.processID !== this.canceledBookingStatus" class="row">
            <div *ngIf="this.adminBooking.booking.isRefund; else notRefund"  class="col" style="color: #0ba90b;font-size: 16px; font-weight: 400; text-align: center; margin: auto">
              Awaiting Refund on <span *ngIf="this.adminBooking.booking.processID <= this.bookingConfirmed">Collection</span>
              <span *ngIf="this.adminBooking.booking.processID >= this.collectedBookingStatus">Return</span> - (Can only be given in person)
            </div>
            <ng-template #notRefund>
              <div class="col" style="color: #0ba90b;font-size: 16px; font-weight: 400; text-align: center; margin: auto">
                Payment Required on Collection
              </div>
            </ng-template>

          </div>
          <div class="row">
            <app-booking-card [currentPage]="this.currentPage" [currentPageID]="this.bookingID"
                              [booking]="this.adminBooking.booking"
                              [adminView]="true"
                              (reloadPage)="this.getBookings()"
            ></app-booking-card>
          </div>

          <div class="row">
            <app-user-card [user]="this.adminBooking.user"></app-user-card>
          </div>


          <div class="row buttonrow" >
            <div *ngIf="this.adminBooking.booking.awaitingExtraPayment && this.adminBooking.booking.processID === this.canceledBookingStatus"  class="col" style="    padding: 0px;">
              <button (click)="this.grantRefund()" class="button btn form-control confirm">
                Grant Cancellation Refund
              </button>
            </div>
            <div *ngIf="this.adminBooking.booking.awaitingExtraPayment && this.adminBooking.booking.processID !== this.canceledBookingStatus"  class="col" style="    padding: 0px;">
              <div *ngIf="this.adminBooking.booking.isRefund; else isNotRefund">
                <button (click)="this.processExtraPayment()" class="button btn form-control extraPayment">
                  Refund Given on <span *ngIf="this.adminBooking.booking.processID <= this.bookingConfirmed">Collection</span>
                                    <span *ngIf="this.adminBooking.booking.processID >= this.collectedBookingStatus">Return</span>
                </button>
              </div>
              <ng-template #isNotRefund>
                <button (click)="this.grantRefund()" class="button btn form-control extraPayment">
                  Payment Accepted on <span *ngIf="this.adminBooking.booking.processID <= this.bookingConfirmed">Collection</span>
                                        <span *ngIf="this.adminBooking.booking.processID >= this.collectedBookingStatus">Return</span>
                </button>
              </ng-template>
            </div>
            <div *ngIf="this.adminBooking.booking.processID >= this.awaitingConfirmationStatus && this.adminBooking.booking.processID !== this.canceledBookingStatus &&
                                                this.adminBooking.booking.processID !== this.completedBookingStatus" class="col" style="    padding: 0px;">
              <button (click)="this.progressBooking()" class="button btn form-control confirm">
                <span *ngIf="this.adminBooking.booking.processID === this.awaitingConfirmationStatus">Confirm Booking</span>
                <span *ngIf="this.adminBooking.booking.processID === this.bookingConfirmed">Confirm Customer Collection</span>
                <span *ngIf="this.adminBooking.booking.processID === this.collectedBookingStatus">Confirm Customer Return</span>
                <span *ngIf="this.adminBooking.booking.processID === this.returnedBookingStatus">Complete Booking</span>
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

    .buttonrow {
      margin-top: 5px;
      margin-right: -29px;
      margin-left: -29px;
    }

    .confirm {
      background-color: #416930;
      color: #dbdbdb;
      border-color: #325a22;
    }

    .pickup {
      background-color: #306030;
      color: #cfcfcf;
      border-color: #114f11;
    }

    .Waiting {
      color: #d68149;
    }

    .Canceled {
      color: darkred;
    }

    .adminPanel {
      border-radius: 8px;
      color: rgb(218 219 219);
      padding: 2px 0px 0px 0px;
      background-color: #252a2b;
      border: 2px solid #5f5f5f;
      border-radius: 8px;
    }

    th {
      font-size: 17px;
    }

    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 80%;
    }

    @media screen and (max-width: 1200px) {
      :host {
        width: 90%;
      }
    }

    @media screen and (max-width: 800px) {
      :host {
        width: 95%;
      }
    }

    @media screen and (max-width: 500px) {
      :host {
        width: 100%;
      }
    }
  `]
})
export class AdminBookingViewPageComponent implements OnInit, OnDestroy, OnChanges {

  currentPage = '/admin/booking/view';

  awaitingConfirmationStatus = BookingStatus.AwaitingConfirmation;
  bookingConfirmed = BookingStatus.BookingConfirmed;
  collectedBookingStatus = BookingStatus.CollectedBooking;
  returnedBookingStatus = BookingStatus.ReturnedBooking;
  canceledBookingStatus = BookingStatus.CanceledBooking;
  completedBookingStatus = BookingStatus.CompletedBooking;

  bookingID;

  adminBooking;
  bookingSub;

  countDown: Subscription;

  init = false;
  tick = 1000;
  ngbModalOptions;

  constructor(private modalService: NgbModal, private adminService: AdminService, private route: ActivatedRoute, public navService: NavService, public toolsServies: ToolsService) {
    this.route.paramMap.subscribe(params => {
      this.bookingID = +params.get('id');
      this.getBookings();
    });

    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

  }

  ngOnInit(): void {

  }

  getBookings(): void{
    this.bookingSub =  this.adminService.GetBooking(this.bookingID, data => {
      this.adminBooking = data;
      const start = new Date(this.adminBooking.booking.start * 1000);
      start.setHours(12 + this.getTime(this.adminBooking.booking.extension, this.adminBooking.booking.lateReturn));

      this.adminBooking.booking.countdownDate = start.valueOf() - new Date().valueOf();

      this.countDown = timer(0, this.tick)
        .subscribe(() => {
          this.adminBooking.booking.countdownDate = this.adminBooking.booking.countdownDate - 1000;
        });
    });
  }

  getTime(extension: boolean, lateReturn: boolean): number {
    if (!extension && !lateReturn){
      return 1;
    }
    if (extension && !lateReturn){
      return 4;
    }
    if (!extension && lateReturn){
      return 6;
    }
  }


  ngOnDestroy(): void {
    if (this.bookingSub !== undefined){
      this.bookingSub.unsubscribe();
    }


  }

  ngOnChanges(): void {



  }

  progressBooking(): void {

    const details = this.modalService.open(AdminProgressBookingComponent, this.ngbModalOptions);
    details.componentInstance.adminBooking = this.adminBooking;
    details.componentInstance.reloadPage.subscribe(data => {
      this.getBookings();
    });


  }

  acceptRefund(): void {

  }
}
