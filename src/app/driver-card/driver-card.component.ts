import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Car} from '../services/car/Car';
import {Router} from '@angular/router';
import {Booking, Driver} from '../services/booking/Booking';
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
import {deflate} from 'zlib';

@Component({
  selector: 'app-driver-card',
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
                {{this.driver.LastName}} {{this.driver.Names}}
              </div>
            </div>
          </div>
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                Address:
              </div>
              <div class="col-8 data">
                {{this.driver.Address}}
              </div>
            </div>
          </div>
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                PostCode:
              </div>
              <div class="col-8 data" >
                {{this.driver.PostCode}}
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
                {{this.age}} Years
              </div>
            </div>
          </div>
          <div class="col-4 book-auto">
            <div class="row">
              <div class="col-4">
                License:
              </div>
              <div class="col-8 data">
                {{this.driver.LicenseNumber}}
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
                BlackListed:
              </div>
              <div class="col-8 data" [ngClass]="this.driver.BlackListed ? 'true' : 'false'">
                {{this.driver.BlackListed}}
              </div>
            </div>
          </div>
        </div>
        <div>
            <a  data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
              View Documents
            </a>
          <div class="collapse" id="collapseExample">
            <img class="card-img-top" style="max-width: 400px" src="http://localhost:8080/documents/{{this.driver.ID}}/{{this.booking.ID}}/license.jpg" alt="img-fluid">
            <img class="card-img-top"  style="max-width: 400px"src="http://localhost:8080/documents/{{this.driver.ID}}/{{this.booking.ID}}/document1.jpg" alt="img-fluid">
            <img class="card-img-top"  style="max-width: 400px" src="http://localhost:8080/documents/{{this.driver.ID}}/{{this.booking.ID}}/document2.jpg" alt="img-fluid">
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

    .bookingPanel:hover {
      opacity: 90%;
      background-color: rgba(255, 255, 255, 0.05);
    }

    :host {
      width: 100%;
      margin: 10px auto;
      color: #ffffff99;
    }
  `]
})
export class DriverCardComponent implements OnInit, OnChanges {

  @Input()
  showAdmin = true;

  @Input()
  driver: Driver;

  @Input()
  booking: Booking;

  dob;
  created;

  age;

  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              private bookingService: BookingService, public navService: NavService, public toolService: ToolsService) {

  }

  ngOnInit(): void {
    this.dob = new Date(this.driver.DOB * 1000);
    this.setAge();
  }

  setAge(): void{
    if (this.dob !== undefined){
      this.age = this.toolService.calculateAge(this.dob);
    }


  }

  ngOnChanges(): void {
    this.dob = new Date(this.driver.DOB * 1000);
    this.setAge();
  }






}
