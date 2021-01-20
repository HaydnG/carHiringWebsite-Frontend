import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from '../services/car/car.service';
import {BookingService} from '../services/booking/booking.service';
import {Booking, BookingStatus} from '../services/booking/Booking';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-booking-page',
  template: `

    <div class="container-fluid" style="    min-height: 500px;
    border-radius: 8px;
    color: rgb(218 219 219);
    padding: 2px 0px 0px 0px;
    background-color: #252a2b;">

      <div style="    border-color: #6f6f6f;" class="card-header">
        <div class="col">
          <div class="row"><h1>My Bookings page</h1></div>
          <div class="row" *ngIf="this.hasBookings();">
            <div style="text-align: center; margin: auto; font-size: 18px; font-weight: 500;color: #7bab7b">
              *On the day of collection, please bring a <strong style="color: #bc4e4e">PhotoCard Driving License</strong> and 1 other form
              of identity.
              <br>(Either a <strong style="color: #bc4e4e">Recent Utility Bill</strong> within 3 months, or a <strong
              style="color: #bc4e4e">Council Tax Statement</strong>)
            </div>
          </div>
        </div>


      </div>

      <div class="card-body" style="    padding-top: 5px;" *ngIf="this.hasBookings(); else elseBlock">

        <div class="accessory" *ngFor="let object of this.bookings | keyvalue">
          <div class="row">
            <div class="col">
              <div class="row">
                <h5>{{this.bookingService.statusNames[this.keys[object.key]]}}</h5>
              </div>
              <div class="row pagebook" *ngFor="let booking of object.value"
                   [class.canceled]="this.keys[object.key] == this.bookingService.statuses.CanceledBooking">
                <app-booking-card
                  [booking]="booking" [currentPage]="this.currentPage" [currentPageID]="this.currentID"
                ></app-booking-card>
              </div>
            </div>
          </div>
          <hr style="color: white !important;
    border-color: #6f6f6f;
    border-width: 2px;">
        </div>
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
    .pagebook{
      margin: 5px 10px 5px 10px;
    }

    .canceled{
      opacity: 30%;
      filter: blur(0.5px);
      transition: 0.4s;
    }
    .canceled:hover{
      opacity: 80%;
      filter: blur(0px);
    }

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
export class BookingPageComponent implements OnInit, OnDestroy {


  currentPage = 'booking';
  currentID = 0;

  keys;
  bookings: Record<number, Partial<Booking>>;

  userBookingSub: Subscription;
  countDown;

  constructor(private bookingService: BookingService) {
      this.userBookingSub = this.bookingService.userBookings.subscribe(data => {
        this.keys = Object.keys(data);
        this.bookings = Object.values(data);
        console.log(data);
      });

      this.bookingService.GetUsersBookings();
  }

  ngOnInit(): void {
    this.countDown = timer(0, 5000)
      .subscribe(() => {
        this.bookingService.GetUsersBookings();
      });
  }

  ngOnDestroy(): void{
    if (this.userBookingSub !== undefined){
      this.userBookingSub.unsubscribe();
    }
    if (this.countDown !== undefined){
      this.countDown.unsubscribe();
    }
  }

  hasBookings(): boolean{
    if (this.bookings === null || this.bookings === undefined){
      return false;
    }

    return Object.keys(this.bookings).length > 0;
  }

}
