import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from '../services/car/car.service';
import {AdminService} from '../services/admin/admin.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {FormControl} from '@angular/forms';
import {NavService} from '../services/nav/nav.service';
import {BookingStatus} from '../services/booking/Booking';
import {ToolsService} from '../services/tools/tools.service';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-admin-booking-page',
  template: `

    <div (click)="this.navService.Back('/admin')" style="
    position: absolute;
    color: white;
    font-size: 40px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 20px">&larr;
    </div>
    <h1 style="        text-align: center;
    color: white;
    font-size: 36px;
    margin-bottom: 28px;
    text-decoration: underline;
    text-underline-offset: 1px;
    text-shadow: 2px 5px 15px #000000;
}">Booking Management</h1>
    <button type="button" class="btn btn-default btn-sm" (click)="this.loadbookings();" style="    position: absolute;
    right: 35px;
    color: white;
    width: 100px;
    top: 75px;
    padding-right: 60px;
    padding-top: 2px;
    height: 30px;">
      <span class="material-icons" style="    position: absolute;
    left: 1px;
    top: 2px;">refresh</span><span style="top: 3px;
    left: 30px;
    position: absolute;">Refresh ({{this.seconds}})</span>
    </button>
    <div class="card-deck" style="    justify-content: center;">


      <div class="card adminPanel">
        <div class="card-body ">
          <div class="card-title" style="color: #5cc65c;padding: 5px">Upcoming Confirmed Bookings (next 5)</div>
          <app-admin-booking-table [bookings]="upcomingBookings"
                                   [DoCountdown]="true"
                                   [ShowStatus]="false"
                                   [currentPage]="currentPage"></app-admin-booking-table>

        </div>
      </div>
      <div class="card adminPanel">
        <div class="card-body ">
          <div class="card-title Waiting" style="padding: 5px">Returned (Awaiting Completion Mark)</div>
          <app-admin-booking-table [bookings]="returned"
                                   [DoCountdown]="false"
                                   [ShowStatus]="false"
                                   [currentPage]="currentPage"></app-admin-booking-table>

        </div>
      </div>

      <div class="card adminPanel">
        <div class="card-body ">
          <div class="card-title" style="color: #aae3aa;padding: 5px">In Progress</div>
          <app-admin-booking-table [bookings]="inProgress"
                                   [DoCountdown]="true"
                                   [ShowStatus]="false"
                                   [timerText]="'Return due in'"
                                   [currentPage]="currentPage"></app-admin-booking-table>

        </div>
      </div>

      <div class="card adminPanel">
        <div class="card-body ">
          <div class="card-title Waiting" style="padding: 5px">Awaiting Confirmation - <span
            style="color: #008000;font-size: 16px; font-weight: 400;">
              Awaiting Admin Action
            </span></div>
          <app-admin-booking-table [bookings]="awaitingConfirmationBookings"
                                   [DoCountdown]="true"
                                   [ShowStatus]="false"
                                   [currentPage]="currentPage"></app-admin-booking-table>
        </div>
      </div>

      <div class="card adminPanel">
        <div class="card-body ">
          <div class="card-title" style="color: #cd7979;padding: 5px">Awaiting Payment</div>
          <app-admin-booking-table [bookings]="awaitingPayment"
                                   [DoCountdown]="true"
                                   [ShowStatus]="false"
                                   [currentPage]="currentPage"></app-admin-booking-table>
        </div>
      </div>

      <div class="card adminPanel">
        <div class="card-body ">
          <div class="card-title" style="color: #cd7979;padding: 5px">Canceled Booking Refund Queries</div>
          <app-admin-booking-table [bookings]="queryingRefund"
                                   [DoCountdown]="false"
                                   [ShowStatus]="false"
                                   [currentPage]="currentPage"></app-admin-booking-table>
        </div>
      </div>


      <div class="card adminPanel" style="min-width: 97%;">
        <div class="card-body ">
          <div class="row" style="margin: auto">
            <div class="col-2" style="    margin: auto;min-width: 100px">
              <div class="card-title">Booking Search</div>
            </div>

            <div class="col-4" style="min-width: 300px; margin: auto;">
              <div class="row" style="background-color: #292d2f;
    height: 41px;
    margin-bottom: 16px !important;">
                <div class="col-10" style="padding: 0px">
                  <mat-form-field appearance="legacy" style="width: 100%; color: white">
                    <mat-select (selectionChange)="this.updateStatusFilter()" [(value)]="this.selectedStatuses"
                                [formControl]="statusesControl" multiple>
                      <mat-select-trigger>
                        {{this.getStatusText()}}

                      </mat-select-trigger>


                      <mat-option *ngFor="let status of this.statuses" sele [value]="status.ID">({{status.ID}}
                        ) {{status.Description}}</mat-option>
                    </mat-select>
                    <mat-placeholder class="placeholder">Status</mat-placeholder>
                  </mat-form-field>
                </div>
                <div class="col-1 inputBut">
                  <div (click)="this.clear()" style="    margin-top: 4px;font-size: 13px">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                         viewBox="0 0 16 16">
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </div>
                </div>
                <div class="col-1 inputBut">
                  <div (click)="this.selectAll()" style="    margin-top: 4px;font-size: 11px">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all"
                         viewBox="0 0 16 16">
                      <path
                        d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            <div class="col-3" style="min-width: 200px; display: flex">

              <mat-form-field appearance="legacy" style="    margin: auto;
    display: flex;">
                <input matInput [(ngModel)]="this.bookingSearchInput" (keyup)="onSearch()">
                <mat-placeholder class="placeholder">Booking ID</mat-placeholder>
              </mat-form-field>

            </div>
            <div class="col-3" style="min-width: 200px; display: flex;">
              <mat-form-field appearance="legacy" style="    margin: auto;
    display: flex;">
                <input style="color: white" matInput [(ngModel)]="this.userSearchInput" (keyup)="onSearch()">
                <mat-placeholder class="placeholder">User ID / Name</mat-placeholder>
              </mat-form-field>
            </div>
          </div>

          <app-admin-booking-table [bookings]="bookingsSearch"
                                   [DoCountdown]="false"
                                   [ShowStatus]="true"
          [currentPage]="currentPage"></app-admin-booking-table>
        </div>
      </div>
    </div>
  `,
  styles: [`

    .mat-select-value {
      color: white;
    }

    .card-deck{
      display: flex;
      flex-flow: row wrap;
      margin-right: -5px;
      margin-left: -5px;
    }

    .inputBut {
      background-color: #3f4447;
      height: 28.1px;
      text-align: center;
      padding: 0px;
      margin-top: 11px;
      border-bottom: 1.5px #305152 solid;
      cursor: pointer;
    }

    .inputBut:hover {
      background-color: #393d40;
    }

    .placeholder {
      color: #b5b5b5;
    }

    .card-body {
      flex: 1 1 auto;
      min-height: 1px;
      padding: 6px;
    }

    .card {
      margin-bottom: 10px;
    }

    .Waiting {
      color: #d68149;
    }
    .adminPanel {
      width: 100%;
      background-color: #252a2b;
      color: white;
      border: 2px solid #5f5f5f;
      border-radius: 8px;
      min-width: 49%;
      margin: 5px 5px 5px 5px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 0.3rem;
      margin-top: -6px;
    }

    th {
      font-size: 15px;
    }

    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 80%;
    }

    @media screen and (max-width: 1700px) {
      :host {
        width: 90%;
      }
    }

    @media screen and (max-width: 1400px) {
      :host {
        width: 95%;
      }
    }

    @media screen and (max-width: 800px) {
      :host {
        width: 98%;
      }
    }

    @media screen and (max-width: 500px) {
      :host {
        width: 100%;
      }
    }
  `]
})
export class AdminBookingComponent implements OnInit, OnDestroy {

  currentPage = '/admin/booking';

  userSearchInput = '';
  bookingSearchInput = '';

  queryingRefund;
  returned;
  inProgress;
  awaitingConfirmationBookings;
  upcomingBookings;
  bookingsSearch;
  awaitingPayment;
  statusFilter = '';

  statuses;
  statusesControl = new FormControl();
  selectedStatuses;
  countDown: Subscription;
  seconds = 5;

  constructor(private adminService: AdminService, public navService: NavService, public toolService: ToolsService) {
    this.countDown = timer(0, 1000)
      .subscribe(() => {

        if (this.seconds === 0){
          this.loadbookings();
          this.seconds = 10;
        }
        this.seconds --;


      });

    this.loadbookings();
  }

  ngOnDestroy(): void {
        if (this.countDown){
          this.countDown.unsubscribe();
        }
    }

  loadbookings(): void{
    this.seconds = 9;
    this.adminService.GetQueryingRefundBookings(data => {
      this.queryingRefund = data;
    });

    this.adminService.GetAwaitingBookings(BookingStatus.ReturnedBooking, 5, data => {
      this.returned = data;
    });

    this.adminService.GetAwaitingBookings(BookingStatus.CollectedBooking, 10, data => {
      this.inProgress = data;
      this.inProgress.forEach(booking => {
        const end = this.convertDate(booking.end);
        end.setHours(12 + this.toolService.getTime(booking.fullDay, booking.lateReturn));

        booking.countdownDate = end.valueOf() - new Date().valueOf();
      });

    });

    this.adminService.GetAwaitingBookings(BookingStatus.BookingConfirmed, 5, data => {
      this.upcomingBookings = data;
      this.upcomingBookings.forEach(booking => {
        const start = this.convertDate(booking.start);
        start.setHours(8);

        booking.countdownDate = start.valueOf() - new Date().valueOf();
      });

    });

    this.adminService.GetAwaitingBookings(BookingStatus.AwaitingConfirmation, 10, data => {
      this.awaitingConfirmationBookings = data;
      this.awaitingConfirmationBookings.forEach(booking => {
        const start = this.convertDate(booking.start);
        start.setHours(8);

        booking.countdownDate = start.valueOf() - new Date().valueOf();
      });
    });
    this.adminService.GetAwaitingBookings(BookingStatus.AwaitingPayment, 10, data => {
      this.awaitingPayment = data;
      this.awaitingPayment.forEach(booking => {
        const start = this.convertDate(booking.start);
        start.setHours(8);

        booking.countdownDate = start.valueOf() - new Date().valueOf();
      });
    });

    this.adminService.GetBookingStatuses(data => {
      this.statuses = data;
      this.statusesControl.patchValue([...this.statuses.map(item => item.ID), ]);
      this.selectedStatuses = this.statusesControl.value;
    });

    this.adminService.GetSearchedBookings('', '', '', data => {
      this.bookingsSearch = data;
    });
  }

  ngOnInit(): void {


  }

  convertDate(value: number): Date {
    return new Date(value * 1000);
  }

  onSearch(): void{
    this.adminService.GetSearchedBookings(this.userSearchInput, this.bookingSearchInput, this.statusFilter, data => {
      this.bookingsSearch = data;
    });
  }



  clear(): void {
    this.statusesControl.patchValue([]);
    this.selectedStatuses = this.statusesControl.value;
    this.updateStatusFilter();
  }
  selectAll(): void {
    this.statusesControl.patchValue([...this.statuses.map(item => item.ID), ]);
    this.selectedStatuses = this.statusesControl.value;
    this.updateStatusFilter();
  }

  updateStatusFilter(): void {
    let count = 0;
    const test = this.statuses.map(value => value.ID);
    for (const status of this.statuses){
      for (const i in this.selectedStatuses){
        if (status.ID === this.selectedStatuses[i]){
          test[count] = undefined;
          break;
        }
      }
      count++;
    }
    this.statusFilter = test.filter(v => v !== undefined).join(',');
    console.log(this.statusFilter);
    this.onSearch();
  }

  getStatusText(): string{
    let text = '';

    if (this.statuses === undefined){
      return text;
    }

    let length = 0;
    for (const status of this.statuses){
      for (const i in this.statusesControl.value){
        if (status.ID === this.selectedStatuses[i]){
          length++;
          const values = status.Description.split(' ', 2);

          let count = 0;
          for (const s of values){

            if (values.length > 1){
              if (count === 0){
                text += s.substring(0, 2);
              }else {
                text += s.substring(0, 4);
              }

            }else{
              text += s.substring(0, 4);
            }

            count++;
            if (values.length > 1 && count !== values.length){
              text += '-';
            }
          }

          if (this.statusesControl.value.length !== length){
            text += ', ';
          }

          break;
        }
      }
    }

    return text;
  }
}
