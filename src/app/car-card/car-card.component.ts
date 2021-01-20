import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Car} from '../services/car/Car';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-card',
  template: `
    <div class="card" >
      <div class="row no-gutters">
        <div class="col-auto shadow">
          <img class="card-img-top" src="http://localhost:8080/cars/{{this.car.Image}}.jpg" alt="img-fluid">
        </div>
        <div class="col">
          <div class="card-block px-2">
            <h5 class="card-title">{{this.car.Description}}</h5>
            <hr>
            <p class="card-text">{{this.car.CarType.Description}}</p>
            <p class="card-text">{{this.car.FuelType.Description}}, {{this.car.GearType.Description}}, {{this.car.Size.Description}}</p>
            <div class="row" style="margin-top: 2px;">
              <div class="col-1">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </div>
              <div class="col-1">
                <div class="seat-text">{{this.car.Seats}}</div>
              </div>
              <div class="col" style="margin: auto; font-weight: 500">
                {{this.car.Colour.Description}}
              </div>
            </div>
            <div class="row">
              <div class="col-6 cost">£{{this.car.Cost}}/day</div>
              <div class="col-6" style="padding: 2px 0px 0px 9px;"><a (click)="change(this.car.ID)" class="btn btn-success">View Car</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`      hr {
    border: solid;
    border-width: 0.1px;
    position: absolute;
    width: 202px;
    left: -1px;
    color: #373E40;
    margin: 0px;
  }

  .seat-text {
    display: inline;
    font-weight: bolder;
    margin-top: 1px;
    left: 9px;
    position: absolute;
  }

  .col-auto {
    left: -1px;
    top: -1px;
  }

  .shadow {
    display: block;
    position: relative;
    border-radius: 4px;
    background-color: #252a2b;
  }

  .shadow:before {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    -moz-box-shadow: inset 0px 0px 6px 6px rgba(255,255,255,1);
    -webkit-box-shadow: inset 0px 0px 6px 6px rgb(37 42 43);
    box-shadow: inset 0px 0px 0px 2px rgb(37 42 43);
    border-radius: 4px;
  }

  img {
    border-radius: 5px;
    height: auto;
    width: auto;
    max-width: 131px !important;
    max-height: 128px;
  }

  .card {
    color: #ffffffbf !important;
    background-color: #252a2b;
    color: #373E40;
    width: 332px;
    height: 128px;
    border-radius: .20rem;
    margin: 10px 10px 10px 10px;
  }

  .col-6 {
    padding: 5px;
  }

  .card-title {
    margin-top: 1px;
    margin-bottom: -4px;
    height: 25px;
    width: 183px;
    font-size: 19px;
    word-break: break-all;
    overflow: hidden;
  }

  .card-text {
    width: 182px;
    height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 1px 0px -3px 0px;
  }

  .cost {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin: auto;
  }

  .card-body {
    padding: 10px;
  }`]
})
export class CarCardComponent implements OnInit {

  @Input()
  car: Car;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  change(ID: number): void {
    this.router.navigate(['car', {id: ID}]);
  }
}
