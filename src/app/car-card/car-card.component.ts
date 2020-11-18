import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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
            <h4 class="card-title">{{this.carType}}</h4>
            <hr>
            <p class="card-text">{{this.fuelType}}, {{this.gearType}}, {{this.size}}, {{this.colour}}</p>
            <div class="row">
              <div class="col-6 cost">£10/day</div>
              <div class="col-6"><a href="#" class="btn btn-success">View Car</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styles: [`      hr {
    border: solid;
    border-width: 0.1px;
    position: absolute;
    width: 202px;
    left: -1px;
    color: #373E40;
    margin: 0px;
  }
    .col-auto{
      left: -1px;
      top: -1px;
    }
    img{
      border-radius: 4px;
      height: 126px;
      width: 126px;
    }
  .card {
    color: #373E40;
    width: 330px;
    height: 126px;
    border-radius: .20rem;
    margin: 10px 10px 10px 10px;
  }

  .col-6 {
    padding: 5px;
  }

  .card-title {
    margin-bottom: 0px;
  }

  .card-text {
    width: 182px;
    height: 45px;
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
  fuelType;
  @Input()
  gearType;
  @Input()
  carType;
  @Input()
  size;
  @Input()
  colour;
  @Input()
  description;

  constructor() { }

  ngOnInit(): void {
  }

}
