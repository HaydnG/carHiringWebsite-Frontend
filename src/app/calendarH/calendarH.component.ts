import {Component, EventEmitter, Input, Output, NgModule, OnInit} from '@angular/core';
import {Car} from '../services/car/Car';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {TimeRange} from '../car-page/TimeRange';
import {Observable, Subscription} from 'rxjs';
import {CarService} from '../services/car/car.service';
import {ActivatedRoute} from '@angular/router';
import {BookingService} from '../services/booking/booking.service';

@Component({
  selector: 'app-calendar',
  template: `

    <div class="cal">
      <div class="row" style="    min-width: 592px;    width: 100%;
    margin: auto;background-color: #4b7979;">
        <div class="col no-pad"><a (click)="modifyMonth(-1)" class="cal-but previous">&laquo; Month</a></div>
        <div class="col"><a (click)="modifyYear(-1)" class="cal-but previous">&laquo; Year</a></div>

        <div class="col" style="padding: 0px;">
          <div class="row">
            <div class="col month-text" >{{this.monthNames[this.now.getMonth()]}} {{this.now.getFullYear()}}</div>
          </div>
          <div class="row">
            <div class="col" style="display: flex;
    justify-content: center;"><a (click)="resetDate()" class="cal-but-small">Refresh</a></div>
          </div>

        </div>
        <div class="col"><a (click)="modifyYear(1)" class="cal-but next">Year &raquo;</a></div>
        <div class="col no-pad"><a (click)="modifyMonth(1)" class="cal-but next">Month &raquo;</a></div>
      </div>
      <table class="table" style="width: 100.05%;    min-width: 592px;    margin-bottom: 0px;">
        <thead class="head">
        <tr>
          <th class="border" scope="col">Sunday</th>
          <th class="border" scope="col">Monday</th>
          <th class="border" scope="col">Tuesday</th>
          <th class="border" scope="col">Wednesday</th>
          <th class="border" scope="col">Thursday</th>
          <th class="border" scope="col">Friday</th>
          <th class="border" scope="col">Saturday</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let week of this.cal">
          <th class="cell" (click)="!$event.target.classList.contains('booked') && !$event.target.classList.contains('secondaryBooked') && updateCalenders(date) "
              [ngClass]="this.isBooked(date)? (date.month !== this.now.getMonth() ? 'secondaryBooked' : 'booked') :
              (date.month !== this.now.getMonth() ? (this.isSelected(date) ? 'secondarySelected' : (this.isSelectedEdge(date) ? 'secondarySelectedEdge' : 'secondary')) :
               (this.isSelected(date) ? 'selected' : (this.isSelectedEdge(date) ? 'selectedEdge' : 'primary')))"
              *ngFor="let date of week" scope="row">
            {{date.day}}
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .mat-calendar-controls .mat-calendar-period-button {
      display: none;
    }

    mat-year-view .mat-calendar-body-label {
      display: none !important;
    }

    .table {
      margin-bottom: 5px;
    }

    .border {
      border: 2px solid #191c1c !important;
    }

    th {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
      /* Non-prefixed version, currently
                                       supported by Chrome, Edge, Opera and Firefox */
      text-align: center;
      background-color: #b8b8b8;
      color: #2d2d2d;
      border: 1px solid #202424 !important;
      width: 102px;
    }

    .cal-but {
      border-radius: 2px;
      text-decoration: none;
      display: inline-block;
      padding: 10px 4px;
      cursor: pointer;
      user-select: none;
      background-color: #529094;
      width: 90%;
      text-align: center;
      min-width: 62px;
      max-width: 160px;
      height: 49px;
      line-height: 28px;
    }

    .cal-but-small {
      border-radius: 2px;
      text-decoration: none;
      display: inline-block;
      padding: 10px 4px;
      cursor: pointer;
      user-select: none;
      background-color: #305252;
      color: #ffffff;
      width: 90%;
      text-align: center;
      min-width: 62px;
      max-width: 160px;
      height: 22px;
      line-height: 2px;
    }

    .secondary {
      background-color: rgb(239, 239, 239);
      color: #d6d6d6;
      cursor: pointer;
    }

    .secondary:hover {
      background-color: rgb(215, 215, 215);
    }

    .primary {
      background-color: rgb(130, 157, 119);
      cursor: pointer;
    }


    .primary:hover {
      background-color: rgb(110, 133, 100);
      cursor: pointer;
    }


    .secondarySelected {
      background-color: rgb(175, 190, 255);
      color: white !important;
      cursor: pointer;
    }

    .secondarySelectedEdge {
      background-color: rgb(63, 86, 179);
      color: white !important;
      cursor: pointer;
    }

    .selected {
      background-color: rgb(44, 85, 255);
      color: white !important;
      cursor: pointer;
    }

    .selectedEdge {
      background-color: rgb(26, 52, 159);
      color: white !important;
      cursor: pointer;
    }


    .booked {
      background-color: #ff3849;
      color: white !important;
      height: 100%;
      cursor: default;
    }

    .booked:hover {
      background-color: #c82c3a;
    }

    .secondaryBooked {
      background-color: #debfc0;
      color: #c1a5a5 !important;
      height: 100%;
      cursor: default;
    }

    .secondaryBooked:hover {
      background-color: #d7b9ba;

    }

    .no-pad {
      padding: 0px;
    }

    .cell {
      height: 56px;
      text-align: center;
      vertical-align: middle;
    }

    .month-text {
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      color: #e2e2e2;
    }

    .cal-but:hover {
      background-color: #488286;
    }

    .previous {
      background-color: #305252;
      color: #ffffff;
    }

    .next {
      background-color: #305252;;
      color: #ffffff;
      float: right;
    }

    :host {
      width: 100%;
    }

    .cal {
      overflow: auto;
    }
  `]
})
export class CalendarHComponent implements OnInit {

  @Input() event: Observable<Date>;

  @Input()
  bookings;

  wasStart = true;

  @Input()
  start;
  @Input()
  end;
  lastClicked = 0;


  @Output()
  onDatePicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onReset: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  car: Car;

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  @Input()
  now: Date;

  @Input()
  carID;

  private eventsSubscription: Subscription;

  cal: Cell[][];

  constructor(private carService: CarService, private route: ActivatedRoute, private bookingService: BookingService) {

    this.bookingService.bookingAccepted.subscribe((value) => {
      this.initCalendar(this.now);

    });

    this.now = new Date();

    this.cal = [];
    for (let x = 0; x < 6; x++){
      this.cal[x] = [];
    }

  }

  initCalendar(nowDate: Date): void{
    const firstday = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getDay();
    const lastdaybefore = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate();
    const lastday = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate();

    const datePointer = new Date(nowDate.getFullYear(), nowDate.getMonth(), (0 - firstday + 1));
    const nowMonth = nowDate.getMonth();
    let yearCounter = datePointer.getFullYear();

    let dayCounter = 0;
    let beforeDayCounter = datePointer.getDate();
    let monthCounter = datePointer.getMonth();

    for (let x = 0; x < 6; x++){
      for (let y = 0; y < 7; y++){
          if (monthCounter !== nowMonth){
            this.cal[x][y] = new Cell(yearCounter, monthCounter, beforeDayCounter);
            beforeDayCounter++;
            if (beforeDayCounter - 1 === lastdaybefore){
              monthCounter++;
            }
          }else if (dayCounter < lastday){
            this.cal[x][y] = new Cell(yearCounter, monthCounter, ++dayCounter);
            if (dayCounter === lastday){
              dayCounter++;
              beforeDayCounter = 1;
              monthCounter++;
            }
          }
          yearCounter = monthCounter === 12 ? yearCounter + 1 : yearCounter;
          monthCounter = monthCounter === 12 ? 0 : monthCounter;
      }
    }
    console.log(this.cal);
    let start = new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, 1).getTime() / 1000;
    let end = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1).getTime() / 1000;

    if (this.start < start){
      start = this.start;
    }
    if (this.end > end){
      end = this.end;
    }

    this.carService.LoadBookings(start, end, this.carID);
  }

  isBooked(date): boolean {
    const unix = new Date(date.year, date.month, date.day).getTime() / 1000;
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

  modifyMonth(amount): void{
    this.now.setMonth(this.now.getMonth() + amount);
    this.initCalendar(this.now);
  }

  modifyYear(amount): void{
    this.now.setFullYear(this.now.getFullYear() + amount);
    this.initCalendar(this.now);
  }

  ngOnInit(): void {
    this.eventsSubscription = this.event.subscribe((value) => this.initCalendar(value));

    this.route.paramMap.subscribe(params => {
      this.carID = +params.get('id');
      this.carService.LoadCar(this.carID);
      this.initCalendar(this.now);
    });
  }

  updateCalenders(date: Cell): void{

    if (date.month !== this.now.getMonth()){
      if (date.month > this.now.getMonth() && date.year < this.now.getFullYear()) {
        this.modifyMonth(-1);
      } else if ((date.month > this.now.getMonth()) || (date.month < this.now.getMonth() && date.year > this.now.getFullYear())){
        this.modifyMonth(1);
      } else if (date.month < this.now.getMonth()){
        this.modifyMonth(-1);
      }
    }

    this.selectDate(date);


    this.onDatePicked.emit(new TimeRange(this.start, this.end));
  }



  selectDate(date: Cell): void {

    const unix = new Date(date.year, date.month, date.day).getTime() / 1000;

    if (this.start === 0 || this.start === undefined){
      this.setStartAndEnd(unix, this.end, unix);
      return;
    }
    if (this.end === 0 || this.end === undefined){
      if (unix <= this.start){
        this.setStartAndEnd(unix, this.start, unix);
      }else{
        this.setStartAndEnd(this.start, unix, unix);
      }

      return;
    }

    if (this.lastClicked === unix){
      if (this.wasStart){
        this.setStartAndEnd(this.start, unix, unix);
      }else{
        this.setStartAndEnd(unix, this.end, unix);
      }
      this.wasStart = !this.wasStart;
    }

    this.lastClicked = unix;

    if (unix < this.start){
      this.setStartAndEnd(unix, this.end, unix);
      this.wasStart = true;
      return;
    }else if (unix > this.end){
      this.wasStart = false;
      this.setStartAndEnd(this.start, unix, unix);
      return;
    }

    const startDis = Math.abs(unix - this.start);
    const endDis = Math.abs(unix - this.end);

    if (startDis < endDis){
      this.setStartAndEnd(unix, this.end, unix);
      this.wasStart = true;
    }else{
      this.wasStart = false;
      this.setStartAndEnd(this.start, unix, unix);
      this.end = unix;
    }

  }

  setStartAndEnd(start: number, end: number, fallback: number): void{
    let invalid = false;

    this.bookings.forEach(( range ) => {
      if (start < range.Start && end > range.End){
        invalid = true;
        console.log('Invalid range');
        return;
      }
    });

    if (invalid){
      this.start = fallback;
      this.end = fallback;
    }else{
      this.start = start;
      this.end = end;
    }

    return;
  }

  isSelected(date: Cell): boolean {
    const unix = new Date(date.year, date.month, date.day).getTime() / 1000;

    if (unix > this.start && unix < this.end){
        return true;
    }

    return false;
  }

  isSelectedEdge(date: Cell): boolean {
    const unix = new Date(date.year, date.month, date.day).getTime() / 1000;

    if (unix === this.start || unix === this.end){
      return true;
    }

    return false;
  }

  resetDate(): void {
    this.now = new Date();
    this.initCalendar(this.now);

    this.onReset.emit();
  }
}

export class Cell {
  year: number;
  month: number;
  day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
}
