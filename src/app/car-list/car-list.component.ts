import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car/car.service';

@Component({
  selector: 'app-car-list',
  template: `

    <div class="card-deck" >
      <div *ngFor="let car of cars">
        <app-car-card
          [car]="car"
        ></app-car-card>
      </div>
    </div>
    `,
  styles: [`
    .card-deck{
      justify-content: center;
      display: flex;
      flex-flow: row wrap;
      margin-right: -15px;
      margin-left: -15px;
    }

    :host {
      overflow: hidden;
    width: 100%;
      margin-top: 50px;
  }`]
})
export class CarListComponent implements OnInit {

  cars = [];

  public carListSubscription;

  constructor(private carService: CarService) {
    this.carListSubscription = this.carService.carListChange.subscribe((value) => {
      if (value === null){
      }else {
        this.cars = value;
      }
    });
    this.carService.LoadCars();
  }

  ngOnInit(): void {
  }

}
