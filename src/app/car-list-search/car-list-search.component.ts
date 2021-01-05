import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarService} from '../services/car/car.service';
import {NavService} from '../services/nav/nav.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-car-list-search',
  template: `

    <div class="row" style="margin-left: -5px;
    margin-right: -5px;">
      <div class="col small-pad" style="margin: auto;">
            <mat-form-field appearance="legacy" style="width: 100%; color: white; height: 35px;text-align: center;">
              <mat-select (selectionChange)="this.onSearch()" [(value)]="this.selectedFuelTypes"
                          [formControl]="fuelType" multiple>

                <mat-option *ngFor="let fuelType of this.fuelTypes" sele [value]="fuelType.ID">{{fuelType.Description}}</mat-option>
              </mat-select>
              <mat-placeholder class="placeholder">Fuel Type</mat-placeholder>
            </mat-form-field>
      </div>
      <div class="col small-pad" style="margin: auto;">
        <mat-form-field appearance="legacy" style="width: 100%; color: white; height: 35px;text-align: center;">
          <mat-select (selectionChange)="this.onSearch()" [(value)]="this.selectedGearTypes"
                      [formControl]="gearType" multiple>


            <mat-option *ngFor="let gearType of this.gearTypes" sele [value]="gearType.ID">{{gearType.Description}}</mat-option>
          </mat-select>
          <mat-placeholder class="placeholder">Gear Type</mat-placeholder>
        </mat-form-field>
      </div>
      <div class="col small-pad" style="margin: auto;">
        <mat-form-field appearance="legacy" style="width: 100%; color: white; height: 35px;text-align: center;">
          <mat-select (selectionChange)="this.onSearch()" [(value)]="this.selectedCarTypes"
                      [formControl]="carType" multiple>

            <mat-option *ngFor="let carType of this.carTypes" sele [value]="carType.ID">{{carType.Description}}</mat-option>
          </mat-select>
          <mat-placeholder class="placeholder">Car Type</mat-placeholder>
        </mat-form-field>
      </div>
      <div class="col small-pad" style="margin: auto;">
        <mat-form-field appearance="legacy" style="width: 100%; color: white; height: 35px;text-align: center;">
          <mat-select (selectionChange)="this.onSearch()" [(value)]="this.selectedCarSizes"
                      [formControl]="size" multiple>


            <mat-option *ngFor="let size of this.sizes" sele [value]="size.ID">{{size.Description}}</mat-option>
          </mat-select>
          <mat-placeholder class="placeholder">Size</mat-placeholder>
        </mat-form-field>
      </div>
      <div class="col small-pad" style="margin: auto;">
        <mat-form-field appearance="legacy" style="width: 100%; color: white; height: 35px;text-align: center;">
          <mat-select (selectionChange)="this.onSearch()" [(value)]="this.selectedColours"
                      [formControl]="colour" multiple>


            <mat-option *ngFor="let colour of this.colours" sele [value]="colour.ID">{{colour.Description}}</mat-option>
          </mat-select>
          <mat-placeholder class="placeholder">Colour</mat-placeholder>
        </mat-form-field>
      </div>
    </div>
    <div class="row" style="margin-left: -5px;margin-bottom: 5px;    margin-right: -5px;">
      <div class="col small-pad" style="    display: flex;">
        <mat-form-field appearance="legacy" style="margin: auto; width: 100%;     height: 35px;    text-align: center;">
          <input style="color: white;" matInput [(ngModel)]="this.userSearchInput" (keyup)="onSearch()">
          <mat-placeholder class="placeholder">Car Search</mat-placeholder>
        </mat-form-field>
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
export class CarListSearchComponent implements OnInit {

  fuelType = new FormControl();
  selectedFuelTypes = [];
  @Input()
  fuelTypes;

  gearType = new FormControl();
  selectedGearTypes  = [];
  @Input()
  gearTypes;

  carType = new FormControl();
  selectedCarTypes  = [];
  @Input()
  carTypes;

  size = new FormControl();
  selectedCarSizes  = [];
  @Input()
  sizes;

  colour = new FormControl();
  selectedColours  = [];
  @Input()
  colours;

  userSearchInput = '';

  @Output()
  doSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor(private carService: CarService, private navService: NavService) {
  }

  ngOnInit(): void {
  }

  onSearch(): void{

    const searchItem = {0 : this.selectedFuelTypes.join(','),
                      1 : this.selectedGearTypes.join(','),
                      2 : this.selectedCarTypes.join(','),
                      3 : this.selectedCarSizes.join(','),
                      4 : this.selectedColours.join(','),
                    5 : this.userSearchInput};

    this.doSearch.next(searchItem);

    console.log( this.selectedFuelTypes);

  }

}
