import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-list',
  template: `

    <div class="card-deck" >
      <div *ngFor="let car of cars">
        <app-car-card
          [fuelType]="car.fuelType"
          [gearType]="car.gearType"
          [carType]="car.carType"
          [size]="car.size"
          [colour]="car.colour"
          [description]="car.description"
        ></app-car-card>
      </div>
    </div>
    `,
  styles: [`
    .card-deck{
      justify-content: center;
    }

    :host {
    width: 100%;
      margin-top: 80px;
  }`]
})
export class CarListComponent implements OnInit {

  cars = [];

  constructor() {
    for (let i = 0; i < 100; i++){
      this.cars.push({fuelType: 'Diesel', gearType: 'Manuel', carType: 'Van', colour: 'Black', size: 'Medium',
        description: 'A medium van, great for the storage and transportation of goods'});
    }
  }

  ngOnInit(): void {
  }

}
