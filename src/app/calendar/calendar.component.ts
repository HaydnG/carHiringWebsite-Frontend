import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../car/Car';
import {PageType} from '../page/page.service';

@Component({
  selector: 'app-calendar',
  template: `
    <div class="cal">
      <div>{{this.monthNames[this.now.getMonth()]}} {{this.now.getFullYear()}}</div>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Sunday</th>
          <th scope="col">Monday</th>
          <th scope="col">Tuesday</th>
          <th scope="col">Wednesday</th>
          <th scope="col">Thursday</th>
          <th scope="col">Friday</th>
          <th scope="col">Saturday</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let week of this.cal">
          <th scope="row"></th>
          <th *ngFor="let day of week" scope="row">
                {{day}}
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host{
      width: 100%;
    }
    .cal{
      padding: 30px;
    }
  `]
})
export class CalendarComponent implements OnInit {

  @Input()
  car: Car;
  pageEnum = PageType;

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  now: Date;
  cal: number[][];

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
      this.cal[x] = [null, null, null, null, null, null, null];
      if ( ((x * 7) - firstday) >= lastday){
        break;
      }
      for (let y = 0; y < 7; y++){
        let day = 0;
        if (x === 0 && y < firstday){
          day = lastdaymonthbefore - firstday + y + 1;
        }else {
          day = (7 * x) + y + 1 - firstday;
          if ( day > lastday){
            day = day - lastday;
          }
        }
        this.cal[x][y] = day;
      }
    }
  }

  ngOnInit(): void {
  }

}
