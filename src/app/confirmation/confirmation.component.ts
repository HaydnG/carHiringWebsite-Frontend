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

@Component({
  selector: 'app-confirmation',
  template: `
        <div >
          <div class="modal-dialog" style="    margin: 0px;">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
                <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <div class="row" style="padding: 25px;font-weight: 500;font-size: 19px;">
                    {{this.confirmationMessage}}
                  </div>
                  <hr>
              </div>
              <div class="modal-footer">
                <button style="width: 100%; color: white;" [style.background-color]="this.background" [style.border-color]="this.border"
                        type="button" class="btn" data-dismiss="modal" (click)="this.userCallback()">{{this.buttonText}}</button>
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

    hr {
      border-color: #5a5a5a;
      margin: 2px 0px 2px 0px;
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
export class ConfirmationComponent implements OnInit {


  @Input()
  confirmationMessage;
  @Input()
  buttonText;
  @Input()
  background;
  @Input()
  border;

  @Input()
  callBack;

  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              private bookingService: BookingService, private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {

  }

  userCallback(): void{
    this.activeModal.dismiss();
    this.callBack();
  }

  closeBooking(): void{
    this.activeModal.dismiss();
  }

}
