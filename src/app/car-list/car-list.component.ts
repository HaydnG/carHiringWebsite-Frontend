import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car/car.service';
import {NavService} from '../services/nav/nav.service';

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
    width: 95%;
  }`]
})
export class CarListComponent implements OnInit {

  cars = [];

  public carListSubscription;

  constructor(private carService: CarService, private navService: NavService) {
    this.carListSubscription = this.carService.carListChange.subscribe((value) => {
      if (value === null){
      }else {
        this.cars = value;
      }
    });
    this.carService.LoadCars();
    this.navService.Reset();
  }

  ngOnInit(): void {
  }

}
