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
import {AdminCreateCarComponent} from '../admin-create-car/admin-create-car.component';
import {ConfirmationComponent} from '../confirmation/confirmation.component';
import {UserService} from '../services/user/user.service';
import {User} from '../services/user/User';
import {BadLoginComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-user-page',
  template: `

    <div *ngIf="this.user !== undefined" class="container-fluid adminPanel">


      <div style="    position: relative;
    color: white;
    font-size: 20px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 100%;
    right: 10px;
    top: 5px;
    text-align: right;">UserID: {{this.userService.userID}}</div>
      <div [routerLink]="['']" style="position: relative;
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
        Account Details
      </div>


      <div class="card-body" style="    padding-top: 5px;">
        <div class="col">
          <div class="row">
            <app-user-card [showAdmin]="false" [user]="this.user"></app-user-card>
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

    .edit {
      background-color: #8d5f34;
      color: #dbdbdb;
      border-color: #86592f;
    }

    .confirm {
      background-color: #416930;
      color: #dbdbdb;
      border-color: #325a22;
    }

    .accept {
      background-color: #49882e;
      color: #dbdbdb;
      border-color: #4d8f32;
    }

    .deny {
      background-color: #693030;
      color: #dbdbdb;
      border-color: #5a2222;
    }

    .disable {
      background-color: #883535;
      color: #dbdbdb;
      border-color: #702323;
    }

    .pickup {
      background-color: #603058;
      color: #cfcfcf;
      border-color: #4f1149;
    }
    .demote{
      background-color: #2f78a7;
      border-color: #326a8f;
      color: #cfcfcf;
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
export class UserViewPageComponent implements OnInit, OnDestroy, OnChanges {

  currentPage = '/user';

  userID;

  user: User;
  userSub;

  countDown: Subscription;

  init = false;
  tick = 1000;
  ngbModalOptions;
  userSubscription;

  constructor(private modalService: NgbModal, public currencyService: CurrencyService, public userService: UserService,
              private adminService: AdminService, private route: ActivatedRoute, public navService: NavService, public toolsServies: ToolsService) {


    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

    console.log('test');

    this.userService.Get((data) => {
      console.log(data);
      this.user = data;
    });

  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    if (this.userSub !== undefined){
      this.userSub.unsubscribe();
    }


  }

  ngOnChanges(): void {

  }

}
