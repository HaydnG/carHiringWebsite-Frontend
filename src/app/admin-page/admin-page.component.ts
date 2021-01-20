import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car/car.service';
import {AdminService} from '../services/admin/admin.service';
import {Router} from '@angular/router';
import {NavService} from '../services/nav/nav.service';
import {BookingStatus} from '../services/booking/Booking';

@Component({
  selector: 'app-admin-page',
  template: `

    <h1 style="        text-align: center;
    color: white;
    font-size: 36px;
    margin-bottom: 28px;
    text-decoration: underline;
    text-underline-offset: 1px;
    text-shadow: 2px 5px 15px #000000;
}">Admin Panel</h1>

    <div class="card-deck" style="    justify-content: center;">
      <div class="card adminPanel" (click)="this.change('admin/booking')">
        <div class="card-body adminCard">
          <div class="card-title">Bookings</div>

          <div class="col stats">
            <div class="row thead" style="    margin: 0px -10px 24px -10px;">
              <div class="col-9">Process</div>
              <div class="col" style="text-align: center; padding: 0px 4px 0px 0px">Count</div>
            </div>
            <div style="        height: 24px;
    line-height: 16px;" [class.Waiting]="stat.AdminRequired" [class.Online]="stat.ProcessID === this.completedBookingStatus" [class.Disabled]="stat.ProcessID === this.canceledBookingStatus" class="trow row"
                 *ngFor="let stat of this.bookingStats; let i = index">
              <div class="col-9 desc" style="padding: 0px 0px 0px 8px; height: 18px !important;
    overflow: hidden;">{{stat.Description}}</div>
              <div class="col data" style="padding: 0px">{{stat.Count}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card adminPanel" (click)="this.change('admin/user')">
        <div class="card-body adminCard">
          <div class="card-title">Users</div>
          <div class="col stats" *ngIf="this.userStats !== undefined">
            <div class="row thead" style="margin: 0px -10px 28px -10px;">
              <div class="col">Stats</div>
              <div class="col" style="text-align: center">Count</div>
            </div>

            <div class="trow row Waiting">
              <div class="col desc">Admins</div>
              <div class="col data">{{this.userStats.AdminCount}}</div>
            </div>
            <div class="trow row">
              <div class="col desc">Users</div>
              <div class="col data">{{this.userStats.UserCount}}</div>
            </div>
            <div class="trow row Online">
              <div class="col desc">Online Users</div>
              <div class="col data">{{this.userStats.ActiveUsers}}</div>
            </div>
            <div class="trow row">
              <div class="col desc">Repeat Users</div>
              <div class="col data">{{this.userStats.RepeatUsersCount}}</div>
            </div>
            <div class="trow row Disabled">
              <div class="col desc">Black Listed</div>
              <div class="col data">{{this.userStats.BlackListedCount}}</div>
            </div>
            <div class="trow row Disabled">
              <div class="col desc">Disabled</div>
              <div class="col data">{{this.userStats.DisabledCount}}</div>
            </div>


          </div>
        </div>
      </div>
      <div class="card adminPanel" (click)="this.change('admin/car')">
        <div class="card-body adminCard">
          <div class="card-title">Cars</div>
          <div class="col stats" *ngIf="this.carStats !== undefined">
            <div class="row thead" style="margin: 0px -10px 28px -10px;">
              <div class="col">Stats</div>
              <div class="col" style="text-align: center">Count</div>
            </div>
            <div class="trow row Waiting">
              <div class="col desc">Cars</div>
              <div class="col data">{{this.carStats.CarCount}}</div>
            </div>
            <div class="trow row Disabled">
              <div class="col desc">Disabled</div>
              <div class="col data">{{this.carStats.DisabledCount}}</div>
            </div>
            <div class="trow row Online">
              <div class="col desc">Available</div>
              <div class="col data">{{this.carStats.AvailableCount}}</div>
            </div>

          </div>
        </div>
      </div>
      <div class="card adminPanel" (click)="this.change('admin/accessory')">
        <div class="card-body adminCard">
          <div class="card-title">Accessories</div>
          <div class="col stats">
            <div class="row thead" style="margin: 0px -10px 29px -10px;">
              <div class="col">Accessory</div>
              <div class="col" style="text-align: center">Stock</div>
            </div>
            <div class="trow row" style="color: #a4cdcf" *ngFor="let stat of this.accessoryStats">
              <div class="col desc">{{stat.Description}}</div>
              <div class="col data">{{stat.Stock}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .thead {
      font-size: 18px;
      font-weight: bold;
    }

    .Waiting {
      color: #d68149;
    }

    .Disabled {
      color: #d64949;
    }

    .Online {
      color: #2e8c0d;
    }

    .desc {
      font-size: 15px;
      font-weight: 400;
      text-shadow: -2px 1px 7px #000000c7;
    }

    .trow {
      height: 20PX;
      margin: -21px -10px 20px -10px;
      border: 1px solid #00000057;
      height: 28px;
      padding-top: 4px;
    }

    .trowa {
      height: 20PX;
      margin: 15px -10px 15px -10px;
    }

    .card-text {
      text-align: center;
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 20px;
    }

    .stats {
      border-collapse: separate;
      width: 100%;
      border: 1px solid black;
      padding: 5px;
      box-shadow: inset 0px 1px 3px 0px #05060655;
      border-radius: 3px;
      height: 237px;
      overflow: hidden;
      background-color: #ffffff03;
    }

    th {
      font-size: 17px;
    }

    .data {
      font-size: 15px;
      font-weight: 600;
      text-align: center;
    }

    .adminCard {
      padding: 10px !important;
    }

    .adminPanel {
      margin: auto;
      justify-content: center;
      margin-bottom: 25px;
      min-width: 280px;
      max-width: 280px;

      cursor: pointer;
      background-color: #252a2b;
      color: #ffffffbf !important;
      border: 2px solid #5f5f5f;
      border-radius: 8px;
    }

    .adminPanel:hover {
      background-color: #282e2f;
    }

    .card-title {
      margin: 4px 0px 12px 0px;
      font-weight: 600;
      font-size: 27px;
      text-align: center;
    }

    :host {
      margin-top: 10px;
      width: 70%;
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
export class AdminPageComponent implements OnInit {

  awaitingConfirmationStatus = BookingStatus.AwaitingConfirmation;
  bookingConfirmed = BookingStatus.BookingConfirmed;
  collectedBookingStatus = BookingStatus.CollectedBooking;
  returnedBookingStatus = BookingStatus.ReturnedBooking;
  canceledBookingStatus = BookingStatus.CanceledBooking;
  completedBookingStatus = BookingStatus.CompletedBooking;

  bookingStats;
  userStats;
  carStats;
  accessoryStats;

  public carListSubscription;

  constructor(private adminService: AdminService, private router: Router, public navService: NavService) {
    this.adminService.GetBookingStats(data => {
      this.bookingStats = data;
    });

    this.adminService.GetUserStats(data => {
      this.userStats = data;
    });

    this.adminService.GetCarStats(data => {
      this.carStats = data;
    });
    this.adminService.GetAccessoryStats(data => {
      this.accessoryStats = data;
    });
  }

  change(page: string): void {
    this.navService.Navigate('admin', 0, [page]);
  }

  ngOnInit(): void {

  }

}
