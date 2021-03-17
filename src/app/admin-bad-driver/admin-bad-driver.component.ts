import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {AdminService} from '../services/admin/admin.service';
import {AdminBooking} from '../services/admin/admin';

@Component({
  selector: 'app-admin-bad-driver',
  template: `
        <div >
          <div class="modal-dialog" style="    margin: 0px;">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="    font-size: 15px;
    font-weight: 500;">Driver Failed Verification</h5>
                <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="col">
                  <div style="position: absolute;
                      right: 5px;">BookingID: <span style="font-weight: bold">{{this.adminBooking.booking.ID}} </span>
                  </div>
                  <div class="row" style="padding: 40px 30px 10px 30px;font-weight: 500;font-size: 17px;color: #c34343;    display: inline-block;" >
                    <svg  style="display: inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                      <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                      <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                    </svg>
                    <div style="display: inline" *ngIf="this.response === 'blacklisted'">
                       This driver has already been BlackListed on our systems.
                    </div>
                    <div style="display: inline" *ngIf="this.response === 'fraudulentClaim'">
                       This driver has a histroy of fraudulent claims recorded by the Association of British Insurers.
                    </div>
                    <div style="display: inline" *ngIf="this.response === 'invalidLicense'">
                       This driver has an Expired or Invalid License as recorded by the DVLA.
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `,
  styles: [`


    .modal-content {
      display: contents !important;
    }

    :host {
      padding: 0px;
      margin: 0px;
      width: 98% !important;
    }

    hr {
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
export class AdminBadDriverComponent implements OnInit {


  @Input()
  adminBooking: AdminBooking;

  ngbModalOptions;

  @Input()
  response: string;

  @Output()
  reloadPage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              private adminService: AdminService, public bookingService: BookingService, private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {

  }

  progressBooking(failed: boolean): void {
    this.adminService.ProgressBooking( failed, this.adminBooking.booking.ID, data => {
      this.reloadPage.next(true);
      this.activeModal.dismiss();
    });
  }

  closeBooking(): void{
    this.activeModal.dismiss();
  }

  processExtraPayment(): void {

  }

  grantRefund(): void {

  }
}
