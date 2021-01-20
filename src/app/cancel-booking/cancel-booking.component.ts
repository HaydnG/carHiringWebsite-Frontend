import {Component, Input, OnInit} from '@angular/core';
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
import {ToolsService} from '../services/tools/tools.service';

@Component({
  selector: 'app-cancel-booking-card',
  template: `
        <div >
          <div class="modal-dialog" style="    margin: 0px;">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Booking cancellation</h5>
                <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="col">
                  <div style="position: absolute;
                      right: 5px;">BookingID: <span style="font-weight: bold">{{this.booking.ID}} </span>
                  </div>
                  <div class="row" style="padding: 25px;font-weight: 500;font-size: 19px;">
                    Are you sure you want to cancel your booking?
                  </div>
                  <hr>
                  <div class="row" style="padding: 0px 25px 5px 25px;">

                    <div class="col-6 col-auto">
                      <div class="row header">
                        Collection: <span class="day"> {{this.dayNames[this.endDate.getDay()]}}</span>
                      </div>
                      <div class="row dates">
                        {{this.startFormatted}} - <span class="time start"> From 08:00AM</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="row header">
                        Return: <span class="day"> {{this.dayNames[this.startDate.getDay()]}}</span>
                      </div>
                      <div class="row dates">
                        {{this.endFormatted}} - <span class="time end">{{this.toolService.getTimeString(this.booking.fullDay, this.booking.lateReturn, false)}}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" (click)="cancel()">Cancel booking</button>
              </div>
            </div>
          </div>
        </div>
  `,
  styles: [`
    .modal-content {
      display: contents !important;
    }

    :host{
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
      color: #4dbdff;
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
export class CancelBookingComponent implements OnInit {

  dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  @Input()
  booking: Booking;

  startDate;
  endDate;

  startFormatted;
  endFormatted;

  ngbModalOptions;
  created;

  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              private bookingService: BookingService, private activeModal: NgbActiveModal, public toolService: ToolsService) {
    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
  }

  ngOnInit(): void {
    this.startDate = new Date(this.booking.start * 1000);
    this.endDate = new Date(this.booking.end * 1000);
    this.created = new Date(this.booking.created * 1000);

    this.startFormatted = this.startDate.toISOString().split('T')[0];
    this.endFormatted = this.endDate.toISOString().split('T')[0];
  }

  cancel(): void {
    this.bookingService.CancelBooking(this.booking.ID, data => {
      this.bookingService.GetUsersBookings();
    });
    console.log('Canceling booking');
    this.activeModal.dismiss();
  }

  closeBooking(): void{
    this.activeModal.dismiss();
  }

}
