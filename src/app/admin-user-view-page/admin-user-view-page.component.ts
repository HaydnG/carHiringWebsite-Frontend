import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CarService} from '../services/car/car.service';
import {AdminService} from '../services/admin/admin.service';
import {NavService} from '../services/nav/nav.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription, timer} from 'rxjs';
import {ToolsService} from '../services/tools/tools.service';
import {BookingStatus} from '../services/booking/Booking';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CancelBookingComponent} from '../cancel-booking/cancel-booking.component';
import {AdminProgressBookingComponent} from '../admin-progress-booking/admin-progress-booking.component';
import {CurrencyService} from '../services/currency/currency.service';
import {AdminRefundResponseComponent} from '../admin-refund-response/admin-refund-response.component';
import {UserBundle} from '../services/admin/admin';

@Component({
  selector: 'app-admin-user-page',
  template: `

    <div *ngIf="this.userBundle !== undefined" class="container-fluid adminPanel">


      <div style="    position: relative;
    color: white;
    font-size: 20px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 100%;
    right: 10px;
    top: 5px;
    text-align: right;">UserID: {{this.userID}}</div>
      <div (click)="this.navService.Back('/admin/user')" style="position: relative;
    color: white;
    font-size: 42px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 20px;
    left: 11px;
    top: -18px;">&larr;
      </div>

      <div class="card-header" style="        text-align: center;
      color: white;
      font-size: 36px;
      margin-bottom: 10px;
      padding-bottom: 25px;
      text-decoration: underline;
      text-underline-offset: 1px;line-height: 36px;
  }">
        Admin User view
      </div>


      <div class="card-body" style="    padding-top: 5px;">
        <div class="col">
          <div class="row">
            <app-user-card [user]="this.userBundle.user"></app-user-card>
          </div>
          <div class="row" style="    margin-left: -29px;
    margin-right: -29px;">
            <app-admin-booking-table [bookings]="this.userBundle.bookings"
                                     [DoCountdown]="false"
                                     [ShowStatus]="true"
                                     [currentPage]="currentPage"
                                    [pageID]="userID"></app-admin-booking-table>

          </div>
        </div>
      </div>
    </div>

  `,
  styles: [`

    .extraPayment {
      background-color: #6c3aa2;
      color: #dbdbdb;
      border-color: #5d318c;
    }

    .buttonrow {
      margin-top: 5px;
      margin-right: -29px;
      margin-left: -29px;
    }

    .confirm {
      background-color: #416930;
      color: #dbdbdb;
      border-color: #325a22;
    }

    .deny {
      background-color: #693030;
      color: #dbdbdb;
      border-color: #5a2222;
    }

    .pickup {
      background-color: #306030;
      color: #cfcfcf;
      border-color: #114f11;
    }

    .Waiting {
      color: #d68149;
    }

    .Canceled {
      color: darkred;
    }

    .adminPanel {
      border-radius: 8px;
      color: rgb(218 219 219);
      padding: 2px 0px 0px 0px;
      background-color: #252a2b;
      border: 2px solid #5f5f5f;
      border-radius: 8px;
    }

    th {
      font-size: 17px;
    }

    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 80%;
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
export class AdminUserViewPageComponent implements OnInit, OnDestroy, OnChanges {

  currentPage = '/admin/user/view';

  userID;

  userBundle: UserBundle;
  userSub;

  countDown: Subscription;

  init = false;
  tick = 1000;
  ngbModalOptions;

  constructor(private modalService: NgbModal, public currencyService: CurrencyService,
              private adminService: AdminService, private route: ActivatedRoute, public navService: NavService, public toolsServies: ToolsService) {

    this.route.paramMap.subscribe(params => {
      this.userID = +params.get('id');
      this.getUser();
    });

    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

  }

  ngOnInit(): void {

  }

  getUser(): void{
    this.userSub =  this.adminService.GetUser(this.userID, data => {
      this.userBundle = data;
    });
  }

  getTime(extension: boolean, lateReturn: boolean): number {
    if (!extension && !lateReturn){
      return 1;
    }
    if (extension && !lateReturn){
      return 4;
    }
    if (!extension && lateReturn){
      return 6;
    }
  }


  ngOnDestroy(): void {
    if (this.userSub !== undefined){
      this.userSub.unsubscribe();
    }


  }

  ngOnChanges(): void {



  }
}
