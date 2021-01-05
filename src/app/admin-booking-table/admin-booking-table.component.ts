import {AfterContentInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CarService} from '../services/car/car.service';
import {AdminService} from '../services/admin/admin.service';
import {BookingColumn} from '../services/admin/admin';
import {Subscription, timer} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {Status} from '../services/booking/Booking';
import {Router} from '@angular/router';
import {NavService} from '../services/nav/nav.service';
import {ToolsService} from '../services/tools/tools.service';

@Component({
  selector: 'app-admin-booking-table',
  template: `

    <table class="columns" style="    width: 100%;" mat-table [dataSource]="this.dataSource">
      <ng-container matColumnDef="ID">
        <th class="header" mat-header-cell *matHeaderCellDef> ID </th>
        <td class="data" mat-cell *matCellDef="let booking"> {{booking.ID}} </td>
      </ng-container>
      <ng-container matColumnDef="User">
        <th class="header" mat-header-cell *matHeaderCellDef> User </th>
        <td class="data" mat-cell *matCellDef="let booking"> {{booking.UserFirstName + ' ' +booking.UserOtherName}} </td>
      </ng-container>
      <ng-container matColumnDef="Car">
        <th class="header" mat-header-cell *matHeaderCellDef> Car </th>
        <td class="data" mat-cell *matCellDef="let booking"> {{booking.CarDescription}} </td>
      </ng-container>
      <ng-container matColumnDef="Collection">
        <th class="header" mat-header-cell *matHeaderCellDef > Collection </th>
        <td class="data" mat-cell *matCellDef="let booking"> {{this.convertDate(booking.start) | date:'shortDate'}}</td>
      </ng-container>
      <ng-container matColumnDef="Return">
        <th class="header" mat-header-cell *matHeaderCellDef > Return </th>
        <td class="data" mat-cell *matCellDef="let booking"> {{this.convertDate(booking.end) | date:'shortDate'}} {{'0' + this.getTime(booking.extension, booking.lateReturn) + ':00pm'}}</td>
      </ng-container>
      <ng-container matColumnDef="Duration">
        <th class="header" mat-header-cell *matHeaderCellDef > Duration </th>
        <td class="data" mat-cell *matCellDef="let booking"> {{booking.bookingLength}}</td>
      </ng-container>
      <ng-container matColumnDef="{{this.timerText}}" *ngIf="this.DoCountdown">
        <th class="header" mat-header-cell *matHeaderCellDef> {{this.timerText}} </th>
        <td class="data" mat-cell *matCellDef="let booking"> {{this.toolsService.formatCountdown(booking.countdownDate)}}</td>
      </ng-container>
      <ng-container matColumnDef="Status" *ngIf="this.ShowStatus">
        <th class="header" mat-header-cell *matHeaderCellDef> Status </th>
        <td class="data" mat-cell *matCellDef="let booking"> {{booking.process}}</td>
      </ng-container>
      <tr style="    height: 27px;" mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr (click)="this.viewBooking(row.ID)" class="Brows" style="    height: 26px;" mat-row *matRowDef="let row; columns: displayedColumns;" ></tr>
    </table>

  `,
  styles: [`
    th.mat-header-cell:last-of-type, td.mat-cell:last-of-type, td.mat-footer-cell:last-of-type {
      padding-right: 5px;
    }
    th.mat-header-cell:first-of-type, td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type {
      padding-left: 5px;
    }
    .Brows{
      cursor: pointer;
    }
    .Brows:hover {
      background-color: #00000003;
    }

    .data {
      font-size: 14px;
      font-weight: 500;
      padding-bottom: 2px !important;
      padding-left: 5px;
      color: #ffffffbd;
    }

    .header {
      font-size: 17px;
      font-weight: 500;
      color: #c1c1c1;
      padding-left: 3px;
    }

    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 100%;
    }


    .columns {
      border-collapse: separate;
      width: 100%;
      border: 1px solid black;
      box-shadow: inset 0px 0px 20px 0px #0000001f;
      border-radius: 3px;
      overflow: hidden;
      background-color: #ffffff02;
    }
  `]
})
export class AdminBookingTableComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns: string[] = ['ID', 'User', 'Car', 'Collection', 'Return', 'Duration'];

  @Input()
  timerText = 'Collection In';
  @Input()
  ShowStatus;
  @Input()
  DoCountdown;
  @Input()
  bookings: BookingColumn[];
  countDown: Subscription;
  dataSource;

  @Input()
  currentPage;
  @Input()
  pageID = 0;

  init = false;
  tick = 1000;

  addedCollection = false;
  addedStatus = false;

  constructor(private adminService: AdminService, private ref: ChangeDetectorRef, private router: Router,
              private navService: NavService, public toolsService: ToolsService) {


  }

  ngOnInit(): void {
    if (this.DoCountdown){
      this.countDown = timer(0, this.tick)
        .subscribe(() => {
          if (this.bookings !== undefined){
            this.bookings.forEach(booking => {
              booking.countdownDate = booking.countdownDate - 1000;
            });
          }
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    if (this.DoCountdown && !this.addedCollection) {
      this.displayedColumns.push(this.timerText);
      this.addedCollection = true;
    }
    if (this.ShowStatus && !this.addedStatus){
      this.displayedColumns.push('Status');
      this.addedStatus = true;
    }

    this.dataSource = new MatTableDataSource<BookingColumn>(this.bookings);
  }

  convertDate(value: number): Date {
    return new Date(value * 1000);
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



  viewBooking(id: number): void{
    this.navService.Navigate(this.currentPage, this.pageID, ['admin/booking/view', {id}]);
    console.log(id);
  }

  ngOnDestroy(): void {
    if (this.countDown !== undefined){
      this.countDown.unsubscribe();
    }


  }
}
