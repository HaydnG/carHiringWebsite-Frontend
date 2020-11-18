import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../user/user.service';
import {CarService} from '../car/car.service';
import {User} from '../user/User';
import {Car} from '../car/Car';

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
    }

    :host {
    width: 100%;
      margin-top: 80px;
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
    this.carService.Get();
  }

  ngOnInit(): void {
  }

}
