import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Car} from '../car/Car';
import {PageType} from '../page/page.service';
import {MatDatepicker} from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  template: `

    <div class="cal">
      <div class="row">
        <div class="col"><a (click)="modifyMonth(-1)" class="cal-but previous">&laquo; Previous</a></div>
        <input [matDatepicker]="dp" >
        <mat-datepicker-toggle [for]="dp"></mat-datepicker-toggle>
        <mat-datepicker #dp
                        startView="year"
                        (yearSelected)="chosenYearHandler($event)"
                        (monthSelected)="chosenMonthHandler($event, dp)"></mat-datepicker>

        <div class="col month-text" >{{this.monthNames[this.now.getMonth()]}} {{this.now.getFullYear()}}</div>
        <div class="col"><a (click)="modifyMonth(1)" class="cal-but next">Next &raquo;</a></div>
      </div>
      <table class="table">
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
          <th class="cell" *ngFor="let cell of week" scope="row" [ngClass]="{secondary: !cell.primary, primary: cell.primary}">
            <ng-template [ngIf]="cell.day !== 0"> {{cell.day}}</ng-template>
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

    mat-year-view .mat-calendar-body-label{
      display: none !important;
    }

    .border {
      border: 2px solid black !important;
    }

    th {
      text-align: center;
      background-color: #9b9b9b;
      color: black;
      border: 1px solid black !important;
    }

    .cal-but {
      text-decoration: none;
      display: inline-block;
      padding: 8px 16px;
      cursor: pointer;
      user-select: none;
      background-color: #529094;
    }

    .secondary {
      background-color: #b3b3b3;
      color: #e9e9e9;
      border: 1px solid black !important;
    }

    .primary {
      background-color: #d6d6d6;
      border: 1px solid black !important;

    }

    .cell {
      height: 60px;
      text-align: center;
    }

    .month-text {
      text-align: center;
      font-weight: bold;
      font-size: 17px;
    }

    .cal-but:hover {
      background-color: #488286;
    }

    .previous {
      background-color: #529094;
      color: #ffffff;
    }

    .next {
      background-color: #529094;
      color: #ffffff;
      position: absolute;
      right: 16px;
    }

    :host {
      width: 100%;
    }

    .cal {
      padding: 30px;
      overflow: auto;
      margin: 5px;
    }
  `]
})
export class CalendarHComponent implements OnInit {

  @Input()
  car: Car;
  pageEnum = PageType;

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  now: Date;
  cal: Cell[][];

  constructor() {
    this.now = new Date();

    this.initCalendar();

    console.log(this.cal);
  }

  initCalendar(): void{
    const firstday = new Date(this.now.getFullYear(), this.now.getMonth(), 1).getDay();
    const lastday = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0).getDate();
    const lastdaymonthbefore = new Date(this.now.getFullYear(), this.now.getMonth() - 1, 0).getDate();
    console.log(lastday);
    this.cal = [];

    for (let x = 0; x < 6; x++){
      this.cal[x] = [];
      for (let y = 0; y < 7; y++){
        let primary = true;
        let day = 0;
        if (x === 0 && y < firstday){
          primary = false;
          day = lastdaymonthbefore - firstday + y + 1;
        }else {
          day = (7 * x) + y + 1 - firstday;
          if ( day > lastday){
            primary = false;
            day = day - lastday;
          }
        }
        if (((x * 7) - firstday) >= lastday){
          this.cal[x][y] = new Cell(false, 0);
        }else{
          this.cal[x][y] = new Cell(primary, day);
        }
      }
    }
  }

  modifyMonth(amount): void{
    this.now.setMonth(this.now.getMonth() + amount);
    this.initCalendar();
  }

  ngOnInit(): void {
  }

  chosenYearHandler($event: any): void {

  }

  chosenMonthHandler($event: any, dp: MatDatepicker<any>): void {

  }
}

export class Cell {
  day: number;
  primary: boolean;

  constructor(primary: boolean, day: number) {
    this.day = day;
    this.primary = primary;
  }
}
