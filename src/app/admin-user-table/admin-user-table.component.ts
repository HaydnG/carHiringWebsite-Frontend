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
import {Car} from '../services/car/Car';
import {AdminCreateCarComponent} from '../admin-create-car/admin-create-car.component';
import {AdminEditCarComponent} from '../admin-edit-car/admin-edit-car.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../services/user/User';

@Component({
  selector: 'app-admin-user-table',
  template: `

    <table class="columns" style="    width: 100%;" mat-table [dataSource]="this.dataSource">
      <ng-container matColumnDef="ID">
        <th class="header" mat-header-cell *matHeaderCellDef> ID </th>
        <td class="data" mat-cell *matCellDef="let user"> {{user.ID}} </td>
      </ng-container>
      <ng-container matColumnDef="FirstName">
        <th class="header" mat-header-cell *matHeaderCellDef> First Name </th>
        <td class="data" mat-cell *matCellDef="let user"> {{user.FirstName}} </td>
      </ng-container>
      <ng-container matColumnDef="Names">
        <th class="header" mat-header-cell *matHeaderCellDef> Names </th>
        <td class="data" mat-cell *matCellDef="let user"> {{user.Names}} </td>
      </ng-container>
      <ng-container matColumnDef="Email">
        <th class="header" mat-header-cell *matHeaderCellDef > Email </th>
        <td class="data" mat-cell *matCellDef="let user"> {{user.Email}}</td>
      </ng-container>
      <ng-container matColumnDef="Created">
        <th class="header" mat-header-cell *matHeaderCellDef > Created </th>
        <td class="data" mat-cell *matCellDef="let user"> {{this.convertDate(user.CreatedAt) | date:'shortDate'}}</td>
      </ng-container>
      <ng-container matColumnDef="DOB">
        <th class="header" mat-header-cell *matHeaderCellDef > DOB </th>
        <td class="data" mat-cell *matCellDef="let user"> {{this.convertDate(user.DOB) | date:'shortDate'}}</td>
      </ng-container>
      <ng-container matColumnDef="Black Listed">
        <th class="header" mat-header-cell *matHeaderCellDef> Black Listed </th>
        <td [ngClass]="user.Blacklisted ? 'true' : 'false'" class="data" mat-cell *matCellDef="let user"> {{user.Blacklisted}}</td>
      </ng-container>
      <ng-container matColumnDef="Repeat">
        <th class="header" mat-header-cell *matHeaderCellDef> Repeat </th>
        <td [ngClass]="user.Repeat ? 'true' : 'false'" class="data" mat-cell *matCellDef="let user"> {{user.Repeat}}</td>
      </ng-container>
      <ng-container matColumnDef="Admin">
        <th class="header" mat-header-cell *matHeaderCellDef> Admin </th>
        <td [ngClass]="user.Admin ? 'true' : 'false'" class="data" mat-cell *matCellDef="let user"> {{user.Admin}}</td>
      </ng-container>
      <ng-container matColumnDef="Disabled">
        <th class="header" mat-header-cell *matHeaderCellDef> Disabled </th>
        <td [ngClass]="user.Disabled ? 'true' : 'false'" class="data" mat-cell *matCellDef="let user"> {{user.Disabled}}</td>
      </ng-container>
      <ng-container matColumnDef="Booking Count">
        <th class="header" mat-header-cell *matHeaderCellDef> Booking Count </th>
        <td class="data" mat-cell *matCellDef="let user"> {{user.BookingCount}}</td>
      </ng-container>
      <tr style="    height: 27px;" mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr (click)="this.viewUser(row.ID)" class="Brows" style="    height: 26px;" mat-row *matRowDef="let row; columns: displayedColumns;" ></tr>
    </table>

  `,
  styles: [`
    .true {
      color: #74c674 !important;
    }

    .false {
      color: #de5757 !important;
    }

    .hover {
      background-color: #52304b;
      text-align: center;
      border-radius: 6px;
    }

    .hover:hover {
      background-color: #3e2038;
    }

    th.mat-header-cell:last-of-type, td.mat-cell:last-of-type, td.mat-footer-cell:last-of-type {
      padding-right: 5px;
    }

    th.mat-header-cell:first-of-type, td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type {
      padding-left: 5px;
    }

    .Brows {
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
export class AdminUserTableComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns: string[] = ['ID', 'FirstName', 'Names', 'Email', 'Created', 'DOB', 'Black Listed', 'Repeat', 'Admin', 'Disabled', 'Booking Count'];

  @Input()
  users: User[];

  countDown: Subscription;
  dataSource;

  init = false;
  tick = 1000;

  addedCollection = false;
  addedStatus = false;

  ngbModalOptions;

  @Input()
  reload;

  constructor(private adminService: AdminService, private ref: ChangeDetectorRef, private router: Router,
              private navService: NavService, public toolsService: ToolsService, private modalService: NgbModal) {
    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

  }

  change(ID: number): void {
    this.navService.Navigate('/admin/car', 0, ['car', {id: ID}]);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void{

    this.dataSource = new MatTableDataSource<User>(this.users);
  }


  convertDate(value: number): Date {
    return new Date(value * 1000);
  }
  viewUser(id: any): void{
    this.navService.Navigate('/admin/user', 0, ['admin/user/view', {id}]);
  }

  ngOnDestroy(): void {

  }
}
