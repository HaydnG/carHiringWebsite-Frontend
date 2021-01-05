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

@Component({
  selector: 'app-admin-car-table',
  template: `

    <table class="columns" style="    width: 100%;" mat-table [dataSource]="this.dataSource">
      <ng-container matColumnDef="ID">
        <th class="header" mat-header-cell *matHeaderCellDef> ID </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.ID}} </td>
      </ng-container>
      <ng-container matColumnDef="Description">
        <th class="header" mat-header-cell *matHeaderCellDef> User </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.Description}} </td>
      </ng-container>
      <ng-container matColumnDef="Seats">
        <th class="header" mat-header-cell *matHeaderCellDef> Seats </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.Seats}} </td>
      </ng-container>
      <ng-container matColumnDef="Cost">
        <th class="header" mat-header-cell *matHeaderCellDef > Cost </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.Cost}}</td>
      </ng-container>
      <ng-container matColumnDef="Fuel Type">
        <th class="header" mat-header-cell *matHeaderCellDef > Fuel Type </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.FuelType.Description}}</td>
      </ng-container>
      <ng-container matColumnDef="Gear Type">
        <th class="header" mat-header-cell *matHeaderCellDef > Gear Type </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.GearType.Description}}</td>
      </ng-container>
      <ng-container matColumnDef="Car Type">
        <th class="header" mat-header-cell *matHeaderCellDef> Car Type </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.CarType.Description}}</td>
      </ng-container>
      <ng-container matColumnDef="Size">
        <th class="header" mat-header-cell *matHeaderCellDef> Size </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.Size.Description}}</td>
      </ng-container>
      <ng-container matColumnDef="Colour">
        <th class="header" mat-header-cell *matHeaderCellDef> Colour </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.Colour.Description}}</td>
      </ng-container>
      <ng-container matColumnDef="Booking Count">
        <th class="header" mat-header-cell *matHeaderCellDef> Booking Count </th>
        <td class="data" mat-cell *matCellDef="let car"> {{car.BookingCount}}</td>
      </ng-container>
      <ng-container matColumnDef="Over 25 Only">
        <th class="header" mat-header-cell *matHeaderCellDef> Over 25 Only </th>
        <td [ngClass]="car.Over25 ? 'true' : 'false'" class="data" mat-cell *matCellDef="let car"> {{car.Over25}}</td>
      </ng-container>
      <ng-container matColumnDef="View Car">
        <th class="header" mat-header-cell *matHeaderCellDef> </th>
        <td class="data hover" mat-cell (click)="this.change(car.ID)" *matCellDef="let car"> View Car Page</td>
      </ng-container>
      <tr style="    height: 27px;" mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr [class.disabled]="row.Disabled" (click)="this.viewCar(row)" class="Brows" style="    height: 26px;" mat-row *matRowDef="let row; columns: displayedColumns;" ></tr>
    </table>

  `,
  styles: [`

    .hover {
      background-color: #52304b;
      text-align: center;
      border-radius: 6px;
    }

    .hover:hover {
      background-color: #3e2038;
    }

    .disabled {
      background-color: #ff00002b;
    }

    .disabled:hover {
      background-color: rgba(255, 0, 0, 0.3) !important;
    }

    .true {
      color: #74c674 !important;
    }

    .false {
      color: #de5757 !important;
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
      background-color: rgba(0, 0, 0, 0.1);
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
export class AdminCarTableComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns: string[] = ['ID', 'Description', 'Seats', 'Cost', 'Fuel Type', 'Gear Type', 'Car Type', 'Size', 'Colour', 'Booking Count', 'Over 25 Only', 'View Car'];

  @Input()
  cars: Car[];

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

    this.dataSource = new MatTableDataSource<Car>(this.cars);
  }



  viewCar(car: any): void{
    const panel = this.modalService.open(AdminEditCarComponent, this.ngbModalOptions);
    panel.componentInstance.reloadPage = this.reload;
    panel.componentInstance.car = car;
    // this.navService.Navigate('admin/booking', 0, ['admin/booking/view', {id}]);
  }

  ngOnDestroy(): void {

  }
}
