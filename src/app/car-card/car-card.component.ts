import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-card',
  template: `
    <div class="card" style="width: 14rem;">
      <img class="card-img-top" src="https://via.placeholder.com/150x80" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"> {{this.carType}}</h5>
        <p class="card-text">{{this.fuelType}}, {{this.gearType}}, {{this.size}}, {{this.colour}}</p>
        <div class="row">
          <div class="col-6 cost">£10/day</div>
          <div class="col-6"><a  class="btn btn-success">View Car</a></div>

        </div>

      </div>
    </div>`,
  styles: [`
    .card{
      border-radius: .20rem;
      margin: 10px 10px 10px 10px;
    }
  .col-6{
    padding: 5px;
  }
  .cost{
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin: auto;
  }

  .card-body{
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
