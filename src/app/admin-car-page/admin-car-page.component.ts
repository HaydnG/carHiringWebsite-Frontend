import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {CarService} from '../services/car/car.service';
import {AdminService} from '../services/admin/admin.service';
import {NavService} from '../services/nav/nav.service';
import {FormControl} from '@angular/forms';
import {PaymentComponent} from '../payment/payment.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {AdminCreateCarComponent} from '../admin-create-car/admin-create-car.component';

@Component({
  selector: 'app-admin-car-page',
  template: `
    <div (click)="this.navService.Back('/admin')" style="
    position: absolute;
    color: white;
    font-size: 40px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 20px">&larr;
    </div>
    <h1 style="        text-align: center;
    color: white;
    font-size: 36px;
    margin-bottom: 28px;
    text-decoration: underline;
    text-underline-offset: 1px;
    text-shadow: 2px 5px 15px #000000;
}">Admin Cars</h1>
    <div class="card-deck" style="    justify-content: center;">
      <div class="card adminPanel">
        <div class="card-body ">
          <div class="row" style="margin-left: -5px;
    margin-right: -5px;">
            <div class="col-8" style="    font-size: 15px;">
                Click a car to edit
            </div>
            <div class="col" style="    min-width: 200px;">
              <button class="button btn form-control confirm" (click)="this.createCar()" style="    background-color: #305252;
    color: white;">Create Car</button>
            </div>

          </div>
          <div class="row" style="margin-left: -5px;
    margin-right: -5px;">

            <app-car-list-search style="    margin: auto;
    width: 99%;" (doSearch)="this.onSearch($event)"
            [carTypes]="this.carTypes"
             [fuelTypes]="this.fuelTypes"
             [gearTypes]="this.gearTypes"
             [sizes]="this.sizes"
             [colours]="this.colours"></app-car-list-search>

            <app-admin-car-table [reload]="this.reload" style="padding: 1px 5px 1px 5px;" [cars]="this.carList"></app-admin-car-table>

          </div>
        </div>
      </div>
    </div>

  `,
  styles: [`
    .mat-select-value {
      color: white;
    }

    .card-deck{
      display: flex;
      flex-flow: row wrap;
      margin-right: -5px;
      margin-left: -5px;
    }

    .inputBut {
      background-color: #3f4447;
      height: 28.1px;
      text-align: center;
      padding: 0px;
      margin-top: 11px;
      border-bottom: 1.5px #305152 solid;
      cursor: pointer;
    }

    .inputBut:hover {
      background-color: #393d40;
    }

    .placeholder {
      color: #b5b5b5;
    }

    .card-body {
      flex: 1 1 auto;
      min-height: 1px;
      padding: 6px;
    }

    .card {
      margin-bottom: 10px;
    }

    .Waiting {
      color: #d68149;
    }
    .adminPanel {
      width: 100%;
      background-color: #252a2b;
      color: white;
      border: 2px solid #5f5f5f;
      border-radius: 8px;
      min-width: 49%;
      margin: 5px 5px 5px 5px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 0.3rem;
      margin-top: -6px;
    }

    th {
      font-size: 15px;
    }

    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 80%;
    }
    th {
      font-size: 17px;
    }

    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 70%;
    }


    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 80%;
    }

    @media screen and (max-width: 1700px) {
      :host {
        width: 90%;
      }
    }

    @media screen and (max-width: 1400px) {
      :host {
        width: 95%;
      }
    }

    @media screen and (max-width: 800px) {
      :host {
        width: 98%;
      }
    }

    @media screen and (max-width: 500px) {
      :host {
        width: 100%;
      }
    }
  `]
})
export class AdminCarComponent implements OnInit, OnDestroy {

  carList;

  fuelType = new FormControl();
  selectedFuelTypes = [];
  fuelTypes;

  gearType = new FormControl();
  selectedGearTypes  = [];
  gearTypes;

  carType = new FormControl();
  selectedCarTypes  = [];
  carTypes;

  size = new FormControl();
  selectedCarSizes  = [];
  sizes;

  colour = new FormControl();
  selectedColours  = [];
  colours;

  userSearchInput = '';
  ngbModalOptions;

  reload: EventEmitter<any> = new EventEmitter<any>();

  constructor(private adminService: AdminService, public navService: NavService, public carService: CarService, private modalService: NgbModal) {

    this.adminService.GetCars('', '', '', '', '', '', data => {
      this.carList = data;
    });

    this.reload.subscribe((data) => this.adminService.GetCars('',
      '',
      '',
      '',
      ''
      , '', value => {
        this.carList = value;
      })
    );

    this.carService.GetCarAttributes(data => {
      this.carTypes = data[0];
      this.colours = data[1];
      this.fuelTypes = data[2];
      this.gearTypes = data[3];
      this.sizes = data[4];
    });

    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
  }

  ngOnInit(): void {

  }

  createCar(): void{
    const panel = this.modalService.open(AdminCreateCarComponent, this.ngbModalOptions);
    panel.componentInstance.reloadPage = this.reload;


  }

  onSearch(data: any): void{

    this.adminService.GetCars(data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5], value => {
      this.carList = value;
    });

  }

  ngOnDestroy(): void {
  }



}
