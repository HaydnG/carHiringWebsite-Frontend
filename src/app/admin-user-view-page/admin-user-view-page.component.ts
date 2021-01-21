import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
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
import {AdminEditUserComponent} from '../admin-edit-user/admin-edit-user.component';

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
          <div class="row" style="margin-top: 17px">

            <div class="col" style="    min-width: 200px;    padding: 1px 1px 1px 1px;">
              <button *ngIf="!this.userBundle.user.Disabled" class="button btn form-control disable" (click)="this.disable(true)" style="height: 42px;">Disable User</button>
              <button *ngIf="this.userBundle.user.Disabled" class="button btn form-control accept" (click)="this.disable(false)" style="height: 42px;">Enable User</button>
            </div>
            <div class="col" style="    min-width: 200px;    padding: 1px 1px 1px 1px;">
              <button *ngIf="!this.userBundle.user.Blacklisted" class="button btn form-control deny" (click)="this.blacklist(true)" style="height: 42px;">BlackList User</button>
              <button *ngIf="this.userBundle.user.Blacklisted" class="button btn form-control accept" (click)="this.blacklist(false)" style="height: 42px;">Un-BlackList User</button>
            </div>
            <div class="col" *ngIf="this.userService.userID !== this.userID" style="    min-width: 200px;    padding: 1px 1px 1px 1px;">
              <button *ngIf="!this.userBundle.user.Admin" class="button btn form-control pickup" (click)="this.promote(true)" style="height: 42px;">Promote to Admin</button>
              <button *ngIf="this.userBundle.user.Admin" class="button btn form-control demote" (click)="this.promote(false)" style="height: 42px;">Demote User</button>
            </div>
            <div class="col" style="    min-width: 200px;    padding: 1px 1px 1px 1px;">
              <button class="button btn form-control edit" (click)="this.editUser()" style="height: 42px;">Edit User</button>
            </div>
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
export class AdminUserViewPageComponent implements OnInit, OnDestroy, OnChanges {

  currentPage = '/admin/user/view';

  userID;

  userBundle: UserBundle;
  userSub;

  countDown: Subscription;

  init = false;
  tick = 1000;
  ngbModalOptions;



  constructor(private modalService: NgbModal, public currencyService: CurrencyService, public userService: UserService,
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

  ngOnDestroy(): void {
    if (this.userSub !== undefined){
      this.userSub.unsubscribe();
    }


  }

  ngOnChanges(): void {

  }

  blacklist(set: boolean): void {
    let message;
    let button;
    let backgorund;
    let border;

    if (set){
      message = 'Are you sure you want to BlackList this user?';
      button = 'BlackList User';
      backgorund = '#693030';
      border = '#5a2222';
    }else{
      message = 'Are you sure you want to un-BlackList this user?';
      button = 'Un-BlackList User';
      backgorund = '#386924';
      border = '#4d8f32';
    }


    this.openConfirmation(message,
      button,
      backgorund,
      border,
      () => {
        this.adminService.SetUser('1', set, this.userID, () => {
          this.getUser();
        });
      });
  }
  promote(set: boolean): void {
    let message;
    let button;
    let backgorund;
    let border;

    if (set){
      message = 'Are you sure you want to Promote this user?';
      button = 'Promote User';
      backgorund = '#603058';
      border = '#4f1149';
    }else{
      message = 'Are you sure you want to Demote this user?';
      button = 'Demote User';
      backgorund = '#2f78a7';
      border = '#326a8f';
    }


    this.openConfirmation(message,
      button,
      backgorund,
      border,
      () => {
        this.adminService.SetUser('2', set, this.userID, () => {
          this.getUser();
        });
      });
  }

  disable(set: boolean): void {
    let message;
    let button;
    let backgorund;
    let border;

    if (set){
      message = 'Are you sure you want to Disable this user?';
      button = 'Disable User';
      backgorund = '#883535';
      border = '#702323';
    }else{
      message = 'Are you sure you want to Enable this user?';
      button = 'Enable User';
      backgorund = '#386924';
      border = '#4d8f32';
    }

    this.openConfirmation(message,
      button,
      backgorund,
      border,
      () => {
        this.adminService.SetUser('0', set, this.userID, () => {
          this.getUser();
        });
      });
  }

  openConfirmation(message: string, button: string, background: string, border: string, callback: any): void{
    const panel = this.modalService.open(ConfirmationComponent, this.ngbModalOptions);
    panel.componentInstance.confirmationMessage  = message;
    panel.componentInstance.buttonText  = button;
    panel.componentInstance.background  = background;
    panel.componentInstance.border  = border;

    panel.componentInstance.callBack = callback;
  }

  editUser(): void{
    const panel = this.modalService.open(AdminEditUserComponent, this.ngbModalOptions);
    panel.componentInstance.user = this.userBundle.user;
    panel.componentInstance.adminEdit = true;
    panel.componentInstance.reloadPage.subscribe(() => {
      this.getUser();
    });

  }
}
