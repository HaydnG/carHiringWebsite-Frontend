import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Car} from '../services/car/Car';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-card',
  template: `
    <div class="card" >
      <div class="row no-gutters">
        <div class="col-auto">
          <img class="card-img-top" src="https://via.placeholder.com/130x130" alt="img-fluid">
        </div>
        <div class="col">
          <div class="card-block px-2">
            <h4 class="card-title">{{this.car.CarType.Description}}</h4>
            <hr>
            <p class="card-text">{{this.car.FuelType.Description}}, {{this.car.GearType.Description}}, {{this.car.Size.Description}}</p>
            <div class="row">
              <div class="col-1">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </div>
              <div class="col-1">
                <div class="seat-text">{{this.car.Seats}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 cost">£{{this.car.Cost}}/day</div>
              <div class="col-6"><a (click)="change(this.car.ID)" class="btn btn-success">View Car</a></div>
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
  .seat-text{
    display: inline;
    font-weight: bolder;
    margin-top: 1px;
    left: 9px;
    position: absolute;
  }
    .col-auto{
      left: -1px;
      top: -1px;
    }
    img{
      border-radius: 4px;
      height: 125px;
      width: 125px;
    }
  .card {
    color: #373E40;
    width: 326px;
    height: 125px;
    border-radius: .20rem;
    margin: 10px 10px 10px 10px;
  }

  .col-6 {
    padding: 5px;
  }

  .card-title {
    margin-bottom: 0px;
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
    margin: 4px 0px 0px 0px;
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
