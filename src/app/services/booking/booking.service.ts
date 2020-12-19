import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';
import {TimeRange} from '../../car-page/TimeRange';
import {Booking} from './Booking';
import {Car} from '../car/Car';


@Injectable()
export class BookingService {
  private url = 'http://' + window.location.hostname + ':8080/bookingService/';

  bookingAccepted: Subject<Booking> = new Subject<Booking>();

  constructor(private http: HttpClient) {}

  CreateBooking(input: any): void {

    const selectedAccesories = Object.keys(input.accessories).reduce( (filtered, key) => {
      if (input.accessories[key].Checked) { filtered[key] = input.accessories[key]; }

      return filtered;
    }, {});

    const start = new Date(input.start.year, input.start.month - 1, input.start.day).getTime() / 1000;
    const end = new Date(input.end.year, input.end.month - 1, input.end.day).getTime() / 1000;

    if (isNaN(start) || isNaN(end)){
      return;
    }

    this.http.get<Booking>(this.url + 'create?start=' + start + '&end=' + end + '&carid=' + input.car.ID +
      '&extension=' + input.extension.value + '&accessories=' + Object.keys(selectedAccesories).map((k) => k).join(',')
      + '&days=' + input.daysSelected.value + '&late=' + input.lateReturn.value,
      { withCredentials: true }).subscribe(data => {
        this.bookingAccepted.next(data);

    });
  }
}
