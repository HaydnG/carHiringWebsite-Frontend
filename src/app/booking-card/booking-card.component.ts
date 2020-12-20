import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Car} from '../services/car/Car';
import {Router} from '@angular/router';
import {Booking} from '../services/booking/Booking';

@Component({
  selector: 'app-booking-card',
  template: `
    <div class="card" >
      <div class="row no-gutters">
        <div class="col-auto">
          <img class="card-img-top" src="https://via.placeholder.com/130x130" alt="img-fluid">
        </div>
        <div class="col">
          <div class="card-block px-2">
            <h4 class="card-title">{{this.booking.ID}}</h4>
            <hr>
            <p class="card-text">{{this.booking.start}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`      hr {
    border: solid;
    border-width: 0.1px;
    position: absolute;
    width: 202px;
    left: -1px;
    color: #373E40;
    margin: 0px;
  }
  .seat-text{
    display: inline;
    font-weight: bolder;
    margin-top: 1px;
    left: 9px;
    position: absolute;
  }
    .col-auto{
      left: -1px;
      top: -1px;
    }
    img{
      border-radius: 4px;
      height: 125px;
      width: 125px;
    }
  .card {
    color: #373E40;
    width: 326px;
    height: 125px;
    border-radius: .20rem;
    margin: 10px 10px 10px 10px;
  }

  .col-6 {
    padding: 5px;
  }

  .card-title {
    margin-bottom: 0px;
    height: 25px;
    width: 183px;
    font-size: 19px;
    word-break: break-all;
    overflow: hidden;
  }

  .card-text {
    width: 182px;
    height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 4px 0px 0px 0px;
  }

  .cost {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin: auto;
  }

  .card-body {
    padding: 10px;
  }`]
})
export class BookingCardComponent implements OnInit {

  @Input()
  booking: Booking;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
