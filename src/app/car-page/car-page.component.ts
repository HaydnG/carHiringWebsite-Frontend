import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../car/Car';

@Component({
  selector: 'app-car-page',
  template: `
    <div class="container-fluid" style=" background-color: #fff; padding: 11px;">
      <div class="row">

        <div class="col-lg-3 order-lg-1 order-2">
          <img class="car-img" src="https://via.placeholder.com/130x130">
        </div>
        <div class="col-lg-9 order-lg-2 order-1">
            <div class="row car-title">
              {{this.car.CarType.Description}}
            </div>
            <hr>
            <div class="row car-atts">
              {{this.car.FuelType.Description}}, {{this.car.GearType.Description}}, {{this.car.Size.Description}}, {{this.car.Colour.Description}}
            </div>
            <div class="row car-description">
              {{this.car.Description}}
            </div>
            <div class="row car-stats">
              <div class="col-1" style="    text-align: center;">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </div>
              <div class="col-1 seat-text">{{this.car.Seats}}</div>
            </div>

            <div class="row car-cost">
              £{{this.car.Cost}}/day
            </div>
        </div>

      </div>
      <hr>
      <div class="row">
        <app-calendar [car]="this.car"></app-calendar>
      </div>
    </div>`,
  styles: [`
  .car-img{
    width: 100%;
  }
  hr{
    position: relative;
    margin: 10px;
    left: -32px;
    width: 102%;
    border-width: 2px;
    border-color: #373e40;
  }
  .seat-text{
    position: relative;
    top: 1px;
    left: -33px;
    font-weight: bolder;
  }
  .car-stats{
    border-width: 1px;
    border-color: #373e40;
    border-style: groove;
    padding: 10px;
    width: 100%;
  }
  .car-atts{
    font-size: 16px;
    margin-bottom: 10px;
  }
  .car-description{
    height: 85px;
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .car-cost{
    font-size: 18px;
    font-weight: 500;
    bottom: 0;
    position: absolute;
  }
  .car-title{
    font-size: 25px;
    font-weight: 500;
  }
  `]
})
export class CarPageComponent implements OnInit {

  @Input()
  car: Car;

  constructor() { }

  ngOnInit(): void {
  }

}
