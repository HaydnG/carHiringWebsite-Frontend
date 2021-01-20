import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car/car.service';
import {NavService} from '../services/nav/nav.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-car-list',
  template: `

    <app-car-list-search style="background-color: #32383a73;
    width: 100%;
    height: 100%;
    display: block;
    padding: 15px;
    border-radius: 10px;
    box-shadow: inset 0px 0px 8px 0px #00000026;
    margin-bottom: 5px;" (doSearch)="this.onSearch($event)"
                         [carTypes]="this.carTypes"
                         [fuelTypes]="this.fuelTypes"
                         [gearTypes]="this.gearTypes"
                         [sizes]="this.sizes"
                         [colours]="this.colours"></app-car-list-search>

    <div class="card-deck" >
      <div *ngFor="let car of cars">
        <app-car-card
          [car]="car"
        ></app-car-card>
      </div>
    </div>
    `,
  styles: [`
    .small-pad{
      padding: 5px;
    }

    .card-deck{
      justify-content: center;
      display: flex;
      flex-flow: row wrap;
      margin-right: -15px;
      margin-left: -15px;
    }

    :host {
      overflow: hidden;
    width: 95%;
  }`]
})
export class CarListComponent implements OnInit {

  cars = [];

  public carListSubscription;

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


  constructor(private carService: CarService, private navService: NavService) {
    this.carListSubscription = this.carService.carListChange.subscribe((value) => {
      if (value === null){
      }else {
        this.cars = value;
      }
    });
    this.carService.LoadCars('', '', '', '', '', '');
    this.navService.Reset();

    this.carService.GetCarAttributes(data => {
      this.carTypes = data[0];
      this.colours = data[1];
      this.fuelTypes = data[2];
      this.gearTypes = data[3];
      this.sizes = data[4];
    });
  }

  ngOnInit(): void {
  }

  onSearch(data: any): void{

    this.carService.LoadCars(data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5]);

    console.log( this.selectedFuelTypes);

  }

}
