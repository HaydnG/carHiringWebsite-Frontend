import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Accessory, Car} from '../services/car/Car';
import {ActivatedRoute} from '@angular/router';
import {CarService} from '../services/car/car.service';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormBuilder} from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbModal,
  NgbModalOptions,
  NgbDateParserFormatter,
  NgbInputDatepicker
} from '@ng-bootstrap/ng-bootstrap';
import {RegistrationComponent} from '../registration/registration.component';
import {BookingComponent} from '../booking/booking.component';
import {element} from 'protractor';
import {Cell} from '../calendarH/calendarH.component';
import {TimeRange} from './TimeRange';
import {fromEvent, Observable, Subject} from 'rxjs';
import {UserService} from '../services/user/user.service';
import {LoginComponent} from '../login/login.component';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {ScreenService} from '../services/screen/screen.service';
import {CurrencyService} from '../services/currency/currency.service';
import {BookingService} from '../services/booking/booking.service';
import {NavService} from '../services/nav/nav.service';
import {ToolsService} from '../services/tools/tools.service';

@Component({
  selector: 'app-car-page',
  template: `
    <div (click)="this.navService.Back('/')" style="    z-index: 2;
    top: 7px;
    left: 2px;
    padding-left: 7px;
    background-color: #252a2b;
    position: relative;
    color: white;
    font-size: 40px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 46px;
    height: 26px;
    border-radius: 8px;">&larr;
    </div>

    <div class="container-fluid" style="        border-radius: 8px;
    color: rgb(206 206 206);
    padding: 2px 0px 0px 0px;
    background-color: #252a2b;    margin-top: -20px;"
         *ngIf="car !== undefined">
      <div class="row" style="margin: 5px;">

        <div class="col-lg-4 order-lg-1 order-1" style="padding: 0px 6px 3px 3px;
    max-width: 324px;">
          <img class="car-img" src="http://localhost:8080/cars/{{this.car.Image}}.jpg">
        </div>
        <div class="col-lg-8 order-lg-2 order-2" style="min-height: 238px;">
          <div class="row car-title">
            <div class="col-7">
              {{this.car.Description}}
            </div>
            <div class="col">
              <div *ngIf="this.car.Over25" style="font-size: 17px;
    color: #ca4545;
    line-height: 14px;
    margin-bottom: 4px;
    margin-top: 8px;
    min-width: 180px;"> You must be over 25 to rent this vehicle.
              </div>
            </div>
          </div>
          <hr>
          <div class="row car-atts">
            {{this.car.FuelType.Description}}, {{this.car.GearType.Description}}, {{this.car.Size.Description}}
            , {{this.car.Colour.Description}}
          </div>
          <div class="row car-description">
            {{this.car.CarType.Description}}
          </div>
          <div class="row car-stats">
            <div style="    text-align: center;">
              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </div>
            <div class="seat-text">{{this.car.Seats}}</div>
          </div>

          <div class="row car-cost">
            {{this.currencyService.FormatValue(this.car.Cost)}}/day - <label style="    font-size: 15px;
    line-height: 27px;
    margin-left: 10px;">({{this.currencyService.FormatValue(this.car.Cost / 2)}}/Half day) </label>
          </div>
        </div>

      </div>
      <div class="row" style="width: 100.3%;
    left: 14.4px;
    position: relative;">
        <app-calendar [class.col-10]="!this.screenService.isScreenSmall" [carID]="this.carID" style="    padding: 0px;"
                      [car]="this.car" [bookings]="this.bookings" [start]="this.start" [end]="this.end" [now]="this.now"
                      [event]="this.moveCalendar.asObservable()"
                      (onDatePicked)="updateCalenders($event)"
                      (onReset)="resetDates()">
        </app-calendar>
        <div class="col-2 info" [class.hidden]="this.screenService.isScreenSmall" style="    background-color: #252a2b;
    left: -4px;
    height: 457px;
    top: -1px;
    border: 2px solid #191c1c !important;
    margin-bottom: -1px;">
          <div class="priceTitle">
            Pricing information
          </div>
          <hr style="    left: -9%;
    top: -2px;
    width: 101%;
    border-color: #c3cece9c;">
          <div>
            <div style="    text-align: center;margin-top: 5px;">
              <div style="margin-left: 5px;font-weight: 400;
          font-size: 15px;    display: inline;">
                Day(s):
              </div>
              <ng-template #maxday>Max booking (2 weeks) fullDays increase days to show price increase</ng-template>
              <div style=" margin-left: 5px;display: inline;font-weight: 700;"> {{this.getAmountofdays()}} <span [ngbTooltip]="maxday"
                                                                                                                 placement="top"
                                                                                                                 style="font-size: 12px;
    font-weight: 400;
    color: #fd7b7b;">(Max 14)</span>
              </div>
            </div>

            <div style="    text-align: center;margin-top: 5px;">
              <div style="margin-left: 5px;font-weight: 400;
          font-size: 17px;    display: inline;">
                Price:
              </div>
              <div style=" margin-left: 5px;display: inline;font-weight: 700;">{{this.getTotalPrice()}}</div>
            </div>
            <div style="    text-align: center;margin-top: 5px;">
              <div style=" margin-left: 5px;display: inline;font-weight: 700;">Pickup: 8:00am</div>
            </div>
            <div style="    text-align: center;margin-top: 5px;">
              <div style=" margin-left: 5px;display: inline;font-weight: 700;">
                Return: {{this.toolService.getTimeString(this.fullDay.value, this.lateReturn.value, this.isNextDayBooked())}}
              </div>
            </div>
            <ng-template #nextday>These options are only availble if the next day is not booked</ng-template>

            <div class="row" [disableTooltip]="!this.isNextDayBooked()" [ngbTooltip]="nextday">
              <ng-template #fullDayTIP>Increase last day to the full duration</ng-template>
              <div [disableTooltip]="this.isNextDayBooked()" [ngbTooltip]="fullDayTIP" placement="bottom"
                   [class.col-7]="this.userService.repeat"
                   [class.col]="!this.userService.repeat" style="  padding: 0px 0px 0px 10px;  text-align: center;margin-top: 2px;">
                <input [disabled]="this.lateReturn.value || this.isNextDayBooked()" id="checkbox_fullDay" type="checkbox"
                       [(ngModel)]="this.fullDay.value">
                <label class="checklabel" for="checkbox_fullDay" style="font-size: 14px; margin-left: 4px;   margin-bottom: 0px;">Full
                  Day</label>
              </div>
              <ng-template #lateReturnTIP>This option is only for repeat customers.
                Option to drop keys through letterbox after 6:00PM.
              </ng-template>
              <div [disableTooltip]="this.isNextDayBooked()" [ngbTooltip]="lateReturnTIP" placement="bottom" class="col-5"
                   style="  padding: 0px 10px 0px 0px;  text-align: center;margin-top: 2px;" *ngIf="this.userService.repeat">
                <input [disabled]="this.isNextDayBooked()" id="checkbox_late" type="checkbox" [(ngModel)]="this.lateReturn.value"
                       (change)="this.lateReturnEvent()">

                <label class="checklabel" for="checkbox_late" style="font-size: 14px;margin-left: 4px;    margin-bottom: 0px;">Late</label>
              </div>
            </div>

          </div>

          <hr style="    left: -9%;
    top: -1px;
    width: 100.5%;
    border-color: #c3cece9c;">

          <div class="accTitle">
            Accessories
          </div>
          <div style="text-align: center;
    font-size: 12px;">(Accessories in stock)
          </div>


          <div class="form-group row" style="margin-left: -2px;    overflow: auto;
    height: 177px;    margin-bottom: 0px;">
            <div class="col" style="    padding: 0px 10px 0px 10px;">
              <div class="accessory" *ngFor="let object of this.accessories | keyvalue">
                <input id="checkbox_{{object.value.ID}}" type="checkbox" [(ngModel)]="object.value.Checked">
                <label class="checklabel" for="checkbox_{{object.value.ID}}"> {{object.value.Description}}</label>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div>
        <form [formGroup]="dateRangeForm" (ngSubmit)="onSubmit(dateRangeForm.value)" style="    margin: 0px;">
          <div class="row" style="width: 100%;
    position: relative;
    left: 15px;
    padding: 12px 5px 0px 5px;
    background-color: #b7b7b7;">

            <div class="form-group col" style="    margin-bottom: 0.8rem;">
              <div class="input-group">
                <input class="form-control" placeholder="yyyy-mm-dd" autocomplete="off"
                       name="start" formControlName="start" [markDisabled]="inThePast || isBooked" (change)="updateCalDate(a._model)"
                       (dateSelect)="updateCalDate($event)" (click)="a.toggle()" ngbDatepicker [dayTemplate]="customDay"
                       #a="ngbDatepicker">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary calendar" (click)="a.toggle()" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar"
                         viewBox="0 0 16 16">
                      <path fill-rule="evenodd"
                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group col" style="    margin-bottom: 0.8rem;">
              <div class="input-group">
                <input class="form-control" placeholder="yyyy-mm-dd" autocomplete="off"
                       name="end" formControlName="end" [markDisabled]="isBooked" (change)="updateCalDate(a._model)"
                       (dateSelect)="updateCalDate($event)" (click)="b.toggle()" ngbDatepicker [dayTemplate]="customDay"
                       #b="ngbDatepicker">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary calendar" (click)="b.toggle()" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar"
                         viewBox="0 0 16 16">
                      <path fill-rule="evenodd"
                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-3"
                 [disableTooltip]="(!(this.car.Over25 && (!this.userService.over25 && this.userService.loggedIn))) && !this.userService.blackListed"
                 [ngbTooltip]="over25" placement="top">
              <ng-template #over25><span
                *ngIf="!this.userService.blackListed">You must be over 25 to rent out this car, due to insurance.</span>
                <span *ngIf="this.userService.blackListed">You have been blackListed from making bookings. Please contact support.</span>
              </ng-template>
              <button
                [disabled]="this.car.Over25 && (!this.userService.over25 && this.userService.loggedIn) || this.userService.blackListed"
                class="button btn btn-primary form-control" type="submit" style="padding: 0px 0px 0px 0px;
    font-size: 15px;
    height: 38px;
    min-width: 59px;">Book car
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <ng-template #customDay let-date let-currentMonth="currentMonth" let-selected="selected" let-disabled="disabled" let-focused="focused">
  <span class="custom-day" [class.selected]="isSelected(date)" [class.selectedEdge]="isSelectedEdge(date)"
        [class.booked]="date.month === currentMonth && isBooked(date)"
        [class.disbooked]="date.month !== currentMonth && isBooked(date) "
        [class.disableDay]="date.month !== currentMonth"
        [class.focused]="focused && date.month === currentMonth && !isBooked(date)"
        [class.bg-primary]="selected && date.month === currentMonth && !isBooked(date)" [class.hidden]="date.month !== currentMonth"
        [class.text-muted]="disabled"
        [class.inThePast]="inThePast(date)">
    {{ date.day }}
  </span>
    </ng-template>`,
  styles: [`
    .hidden{
      display: none !important;
    }

    .priceTitle {
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      height: 43px;
      margin: auto;
      width: 137px;
    }


    .accTitle {
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      height: 20px;
      margin: auto;
      width: 137px;
      margin-top: 5px;
    }

    .checklabel {
      margin-left: 6px;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
      font-size: 16px;
    }

    .info {
      padding: 0px 6px 0px 6px;
      margin: 0px 0px 0px 0px;
      box-shadow: inset 0px 0px 8px 0px #00000073;
    }

    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      width: 2rem;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;

    }

    .custom-day:hover, .custom-day.focused {
      background-color: #e6e6e6;
    }

    .selected {
      background-color: rgb(59, 97, 255);
      height: 100%;
    }

    .selected:hover {
      background-color: rgb(50, 86, 229);
      height: 100%;
    }

    .selectedEdge {
      background-color: rgb(46, 77, 214);
      height: 100%;
    }

    .selectedEdge:hover {
      background-color: rgb(36, 62, 188);
      height: 100%;
    }



    .booked {
      background-color: #ff3849;
      color: white !important;
      height: 100%;
      cursor: default;
      pointer-events: none;
    }

    .booked:hover {
      background-color: #9b222e;
      color: white !important;
    }


    .inThePast {
      background-color: #e5e5e5;
      color: #acacac !important;
      height: 100%;
      cursor: default;
      pointer-events: none;
    }

    .disableDay {
      color: #b0b0b0;
    }

    .disbooked {
      background-color: #ffc4c8;
      color: white !important;
      height: 100%;
    }

    form {
      margin: 20px 20px 10px;
    }

    :host {
      width: 80%;
      border-radius: 3px;
    }

    .car-img {
      width: 100%;
      max-width: 311px;
      border-radius: 6px;
    }

    @media screen and (max-width: 1200px) {
      :host {
        width: 90%;
      }

      .car-img {
        width: 100%;
        MAX-WIDTH: 1000PX;
      }
    }

    @media screen and (max-width: 800px) {
      :host {
        width: 95%;
      }

      .car-img {
        width: 100%;
        MAX-WIDTH: 1000PX;
      }
    }

    @media screen and (max-width: 500px) {
      :host {
        width: 100%;
      }

      .car-img {
        width: 100%;
        MAX-WIDTH: 1000PX;
      }
    }


    hr {
      position: relative;
      margin: 7PX 10PX 0PX 18PX;
      left: -32px;
      width: 102%;
      border-width: 2px;
      border-color: #232426;
    }

    .seat-text {
      position: relative;
      left: 2px;
      top: 2px;
      font-weight: bolder;
    }

    .car-stats {
      border-width: 1px;
      border-color: #373e40;
      border-style: groove;
      padding: 10px;
      width: 100%;
    }

    .car-atts {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .car-description {
      height: 65px;
      width: 100%;
      font-size: 14px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .car-cost {
      font-size: 18px;
      font-weight: 500;
      bottom: 0;
      position: absolute;
    }

    .car-title {
      font-size: 25px;
      font-weight: 500;
    }
  `]
})
export class CarPageComponent implements OnInit, OnDestroy {

  @Input()
  car: Car;

  fullDay = {value: false } ;
  lateReturn = {value: false } ;
  nextDayBooked = {value: false } ;
  totalCost = {value: '' } ;
  daysSelected = {value: 0 } ;

  loginModal;

  moveCalendar: Subject<Date> = new Subject<Date>();

  now =  new Date();

  bookings;

  carID;

  selectionInit = false;

  dateRangeForm;
  ngbModalOptions: NgbModalOptions;
  bookingModal;

  accessories;

  start = 0;
  end = 0;

  hoveredDate: NgbDate | null = null;

  carSub;
  bookingSub;
  accesSub;

  constructor(private calendar: NgbCalendar, private route: ActivatedRoute, private carService: CarService,
              private formBuilder: FormBuilder, private modalService: NgbModal,  public formatter: NgbDateParserFormatter,
              private userService: UserService, public screenService: ScreenService,
              public currencyService: CurrencyService, public navService: NavService,
              public toolService: ToolsService) {


    this.carSub =  this.carService.currentCarChange.subscribe((value) => {
      if (value !== null){
        this.car = value;
      }
    });

    this.route.paramMap.subscribe(params => {
      this.carID = +params.get('id');

      this.carService.LoadCar(this.carID);
    });

    this.bookingSub = this.carService.carBookingsChange.subscribe((value) => {
      if (value !== null){
        this.bookings = value;
        if (!this.selectionInit){
          this.initDates();
          this.selectionInit = true;
        }
      }
    });

    this.accesSub = this.carService.accessoryListChange.subscribe((value) => {
      if (value !== null){
        if (this.accessories === null || this.accessories === undefined || Object.keys(this.accessories).length <= 0){
          this.accessories = value;
        }else {
          for (const key in this.accessories) {
            if (!value.hasOwnProperty(key)){
              delete this.accessories[key];
            }
          }
          for (const key in value) {
            if (!this.accessories.hasOwnProperty(key)){
              this.accessories[key] = value[key];
            }
          }
        }

      }
    });


    this.dateRangeForm = this.formBuilder.group({
      start: '',
      end: '',
    });

    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

    this.carService.LoadAccessories(this.start, this.end);
  }



  ngOnDestroy(): void {
    this.carSub.unsubscribe();
    this.bookingSub.unsubscribe();
    this.accesSub.unsubscribe();
  }

  resetDates(): void{

    this.initDates();
  }

  initDates(): void{
    this.start = undefined;
    this.end = undefined;
    const now = new Date();
    const start = new NgbDate(now.getFullYear(), now.getMonth() + 1, now.getDate() + 1);
    this.dateRangeForm.get('start').setValue(start);
    this.dateRangeForm.get('end').setValue(start);
  }

  isDisabled = (date: NgbDate, current: {month: number, year: number}) => date.month !== current.month;
  isBooked = (date: NgbDate) => {
    const unix = new Date(date.year, date.month - 1, date.day).getTime() / 1000;
    let inRange = false;

    if (this.bookings === undefined){
      return false;
    }

    this.bookings.forEach(( range ) => {
       if (unix >= range.Start && unix <= range.End){
         inRange = true;
         return;
       }
    });



    return inRange;
  }

  inThePast = (date: NgbDate) => {
    const unix = new Date(date.year, date.month - 1, date.day).getTime() / 1000;

    const now = new Date().getTime() / 1000;

    if (unix < now){
      return true;
    }


    return false;
  }

  isNextDayBooked(): boolean {

    const nextDay = this.end + (60 * 60 * 24);

    let inRange = false;

    if (this.bookings === undefined){
      return false;
    }

    this.bookings.forEach(( range ) => {
      if (nextDay >= range.Start && nextDay <= range.End){
        inRange = true;
        return;
      }
    });

    this.nextDayBooked.value = inRange;

    return inRange;
  }




  isSelected(date: NgbDate): boolean {
    const unix = new Date(date.year, date.month - 1, date.day).getTime() / 1000;

    if (unix > this.start && unix < this.end){
      return true;
    }

    return false;
  }
  isSelectedEdge(date: NgbDate): boolean {
    const unix = new Date(date.year, date.month - 1, date.day).getTime() / 1000;

    if (unix === this.start || unix === this.end){
      return true;
    }

    return false;
  }





  onSubmit(bookingData): void {

    const start = new Date(this.dateRangeForm.value.start.year, this.dateRangeForm.value.start.month - 1,
      this.dateRangeForm.value.start.day).getTime() / 1000 ;
    const end = new Date(this.dateRangeForm.value.end.year, this.dateRangeForm.value.end.month - 1,
      this.dateRangeForm.value.end.day).getTime() / 1000 ;

    const date = new Date(this.start * 1000);

    if (this.checkValidDates(start, end)){
      return;
    }

    this.getAmountofdays();

    const data = {
      start: bookingData.start,
      end: bookingData.end,
      accessories: this.accessories,
      daysSelected: this.daysSelected,
      totalCost: this.totalCost,
      car: this.car,
      fullDay: this.fullDay,
      lateReturn: this.lateReturn,
      nextDayBooked: this.nextDayBooked};

    if (this.userService.loggedIn){
      this.bookingModal = this.modalService.open(BookingComponent, this.ngbModalOptions);
      this.bookingModal.componentInstance.data = data;
    }else{

      this.loginModal = this.modalService.open(LoginComponent, this.ngbModalOptions);
      (this.loginModal.componentInstance as LoginComponent).isModal = true;
      (this.loginModal.componentInstance as LoginComponent).nextModal = BookingComponent;
      (this.loginModal.componentInstance as LoginComponent).modalData = data;


    }
  }

  ngOnInit(): void {
    this.now = new Date();
  }

  checkValidDates(start: number, end: number): boolean{
    let invalid = false;

    this.bookings.forEach(( range ) => {
      if (start < range.Start && end > range.End){
        invalid = true;
        console.log('Invalid range');
        return;
      }
    });

    return invalid;
  }

  updateCalDate(date: NgbDate): boolean {

    const start = new Date(this.dateRangeForm.value.start.year, this.dateRangeForm.value.start.month - 1,
      this.dateRangeForm.value.start.day).getTime() / 1000 ;
    const end = new Date(this.dateRangeForm.value.end.year, this.dateRangeForm.value.end.month - 1,
      this.dateRangeForm.value.end.day).getTime() / 1000 ;

    const invalid = this.checkValidDates(start, end);

    if (invalid){
      const fallback = new Date(date.year, date.month - 1,
        date.day).getTime() / 1000 ;
      this.start = fallback;
      this.end = fallback;
    }else{
      if ((end - start) > (60 * 60 * 24 * 13 )){

        if (start === this.start){
          this.start = end - (60 * 60 * 24 * 13 );
          this.end = end;
        }else if (end === this.end){
          this.end = start + (60 * 60 * 24 * 13 );
          this.start = start;
        }
      }else {
        if (start > end){
          this.start = start;
          this.end = start;
        }else if (end < start){
          this.start = end;
          this.end = end;
        }else{
          this.start = start;
          this.end = end;
        }
      }

    }
    const jvstart = new Date(this.start * 1000);
    const ngstart = new NgbDate(jvstart.getFullYear(), jvstart.getMonth() + 1, jvstart.getDate());
    const jvend = new Date(this.end * 1000);
    const ngend = new NgbDate(jvend.getFullYear(), jvend.getMonth() + 1, jvend.getDate());

    this.dateRangeForm.get('start').setValue(ngstart);
    this.dateRangeForm.get('end').setValue(ngend);

    this.moveCalender(date);

    return invalid;
  }

  moveCalender(date: NgbDate): void{
    console.log('Moving calender');
    this.carService.LoadAccessories(this.start, this.end);
    this.now = new Date(date.year, date.month - 1, date.day);
    this.moveCalendar.next(this.now);

  }

  updateCalenders(event: any): void {
    if ((this.start === event.Start || event.Start === 0 || event.Start === undefined) &&
      (this.end === event.End || event.End === 0 || event.End === undefined)){
      return;
    }

    this.start = event.Start;
    this.end = event.End;

    const start = new Date(this.start * 1000);
    const end = new Date(this.end * 1000);

    const ngstart = new NgbDate(start.getFullYear(), start.getMonth() + 1, start.getDate());
    const ngend = new NgbDate(end.getFullYear(), end.getMonth() + 1, end.getDate());




    this.dateRangeForm.get('start').setValue(ngstart);
    this.dateRangeForm.get('end').setValue(ngend);

    if (this.start === 0 || this.end === 0){
      return;
    }

    this.carService.LoadAccessories(this.start, this.end);
  }

  getAmountofdays(): number {

    const start = new Date(this.dateRangeForm.value.start.year, this.dateRangeForm.value.start.month - 1, this.dateRangeForm.value.start.day).getTime();
    const end = new Date(this.dateRangeForm.value.end.year, this.dateRangeForm.value.end.month - 1, this.dateRangeForm.value.end.day + 1).getTime();

    let value = (( end - start ) / 1000 / 60 / 60 / 24) - 0.5;

    value += this.toolService.getExtensionDays(this.fullDay.value, this.lateReturn.value, this.isNextDayBooked());

    if (value < 0 || isNaN(value) || value === undefined){
      this.daysSelected.value = 0;
      return 0;
    }
    this.daysSelected.value = value;
    return value;
  }

  getTotalPrice(): string {
    this.totalCost.value = this.currencyService.FormatValue(this.getAmountofdays() * this.car.Cost);

    return this.totalCost.value;
  }

  lateReturnEvent(): void {

  }


}


