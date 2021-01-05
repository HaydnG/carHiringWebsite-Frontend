import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Car} from '../services/car/Car';
import {Router} from '@angular/router';
import {Booking} from '../services/booking/Booking';
import {CurrencyService} from '../services/currency/currency.service';
import {PaymentComponent} from '../payment/payment.component';
import {BookingService} from '../services/booking/booking.service';
import {DetailsComponent} from '../booking-details/booking-details.component';
import {BookingComponent} from '../booking/booking.component';
import {EditBookingComponent} from '../edit-booking/edit-booking.component';
import {CancelBookingComponent} from '../cancel-booking/cancel-booking.component';
import {BookingHistoryComponent} from '../booking-history/booking-history.component';
import {NavService} from '../services/nav/nav.service';
import {User} from '../services/user/User';
import {ToolsService} from '../services/tools/tools.service';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="row bookingPanel">
      <div class="col">
        <div class="row">
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                Name:
              </div>
              <div class="col-8 data">
                {{this.user.FirstName}} {{this.user.Names}}
              </div>
            </div>
          </div>
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                Email:
              </div>
              <div class="col-8 data">
                {{this.user.Email}}
              </div>
            </div>
          </div>
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                Admin:
              </div>
              <div class="col-8 data" [ngClass]="this.user.Admin ? 'true' : 'false'">
                {{this.user.Admin}}
              </div>
            </div>
          </div>
        </div>
        <div class="row" style="    margin-top: 5px;">
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                D.O.B:
              </div>
              <div class="col-8 data">
                {{this.dob | date}}
              </div>
            </div>
          </div>
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                Age:
              </div>
              <div class="col-8 data">
                {{this.toolService.calculateAge(this.dob)}} Years
              </div>
            </div>
          </div>
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                Repeat:
              </div>
              <div class="col-8 data" [ngClass]="this.user.Repeat ? 'true' : 'false'">
                {{this.user.Repeat}}
              </div>
            </div>
          </div>
        </div>
        <div class="row" style="    margin-top: 5px;">
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                Created:
              </div>
              <div class="col-8 data" >
                {{this.created | date:'medium'}}
              </div>
            </div>
          </div>
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4" style="padding-right: 2px">
                Bookings:
              </div>
              <div class="col-8 data" >
                {{this.user.BookingCount}}
              </div>
            </div>
          </div>
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4" style="padding-right: 2px">
                BlackListed:
              </div>
              <div class="col-8 data" [ngClass]="this.user.Blacklisted ? 'true' : 'false'">
                {{this.user.Blacklisted}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .true {
      color: green !important;
    }

    .false {
      color: #dd4747 !important;
    }

    .data {
      font-size: 15px;
      font-weight: 500;
      color: #eeeeee;
      padding: 0px;
    }

    .book-auto {
      max-width: 100%;
      min-width: 250px;
    }

    .bookingPanel {
      border: 2px solid rgb(0 0 0);
      border-radius: 10px;
      background-color: #ffffff05;
      box-shadow: inset 0px 1px 3px 0px #05060661;
      padding: 5px;
    }
    :host {
      width: 100%;
      margin: 10px auto;
      color: #ffffff99;
    }
  `]
})
export class UserCardComponent implements OnInit {


  @Input()
  user: User;

  dob;
  created;

  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              private bookingService: BookingService, public navService: NavService, public toolService: ToolsService) {

  }

  ngOnInit(): void {
    this.dob = new Date(this.user.DOB * 1000);
    this.created = new Date(this.user.CreatedAt * 1000);
  }




}
