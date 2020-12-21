import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car/car.service';
import {BookingService} from '../services/booking/booking.service';
import {Booking} from '../services/booking/Booking';

@Component({
  selector: 'app-booking-page',
  template: `

    <div class="container-fluid" style="min-height: 500px;    border-radius: 8px; background-color: #e0e0e0;color: rgb(64,64,64); padding: 2px 0px 0px 0px;">

      <div class="card-header">
        <h2>My Bookings page</h2>
      </div>

      <div class="card-body" style="    padding-top: 5px;" *ngIf="this.hasBookings(); else elseBlock">
        <div class="row" *ngIf="this.bookings[1] !== undefined && this.bookings[1].length > 0">
          <div class="col">
            <div class="row">
              <h5>Awaiting payment</h5>
            </div>
            <div class="row" *ngFor="let booking of this.bookings[1]">
              <app-booking-card
                [booking]="booking"
              ></app-booking-card>
            </div>
          </div>
        </div>
        <hr *ngIf="this.bookings[1] !== undefined && this.bookings[1].length > 0">
        <div class="row" *ngIf="this.bookings[3] !== undefined && this.bookings[3].length > 0">
          <div class="col">
            <div class="row">
              <h5>Awaiting Confirmation</h5>
            </div>
            <div class="row" *ngFor="let booking of this.bookings[3]">
              <app-booking-card
                [booking]="booking"
              ></app-booking-card>
            </div>
          </div>
        </div>
        <hr *ngIf="this.bookings[3] !== undefined && this.bookings[3].length > 0">
        <div class="row" *ngIf="this.bookings[4] !== undefined && this.bookings[4].length > 0">
          <div class="col">
            <div class="row">
              <h5>Confirmed</h5>
            </div>
            <div class="row" *ngFor="let booking of this.bookings[4]">
              <app-booking-card
                [booking]="booking"
              ></app-booking-card>
            </div>
          </div>
        </div>
        <hr *ngIf="this.bookings[4] !== undefined && this.bookings[4].length > 0">
        <div class="row" *ngIf="this.bookings[5] !== undefined && this.bookings[5].length > 0">
          <div class="col">
            <div class="row">
              <h5>Completed</h5>
            </div>
          </div>
        </div>
        <hr *ngIf="this.bookings[5] !== undefined && this.bookings[5].length > 0">
      </div>
      <ng-template #elseBlock>
        <div class="card-body" style="margin-top: 10%;text-align: center;
    font-size: 25px;
    font-weight: 500;">
          You currently have no bookings.
        </div>

      </ng-template>

    </div>
    `,
  styles: [`
    hr{
      margin: 5px 0px 5px 0px;
    }
    h5{
      font-size: 25px;
      margin-bottom: 10px !important;
      margin: auto;
    }

    :host {
      width: 80%;
      overflow: hidden;
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
export class BookingPageComponent implements OnInit {


  bookings: Record<number, Partial<Booking>>;

  constructor(private bookingService: BookingService) {
      this.bookingService.GetUsersBookings(data => {
        this.bookings = data;
        console.log(data);
      });
  }

  ngOnInit(): void {
  }

  hasBookings(): boolean{
    if (this.bookings === null || this.bookings === undefined){
      return false;
    }

    return Object.keys(this.bookings).length > 0;
  }

}
