import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';
import {TimeRange} from '../../car-page/TimeRange';
import {Booking, Status} from './Booking';
import {Accessory, Car} from '../car/Car';
import {catchError} from 'rxjs/operators';
import {UserService} from '../user/user.service';


@Injectable()
export class BookingService {
  private url = 'http://' + window.location.hostname + ':8080/bookingService/';

  bookingAccepted: Subject<Booking> = new Subject<Booking>();
  userBookings: Subject<Record<number, Partial<Booking>>> = new Subject<Record<number, Partial<Booking>>>();


  constructor(private http: HttpClient, private  userService: UserService) {}

  CreateBooking(input: any): void {

    const selectedAccesories = Object.keys(input.accessories).reduce( (filtered, key) => {
      if (input.accessories[key].Checked) { filtered[key] = input.accessories[key]; }

      return filtered;
    }, {});

    const start = new Date(input.start.year, input.start.month - 1, input.start.day).getTime() / 1000;
    const end = new Date(input.end.year, input.end.month - 1, input.end.day).getTime() / 1000;

    const lateReturn = input.nextDayBooked.value ? false : input.lateReturn.value;
    const extended = input.nextDayBooked.value ? false : input.extension.value;


    if (isNaN(start) || isNaN(end) || start > end){
      return;
    }

    this.http.get<Booking>(this.url + 'create?start=' + start + '&end=' + end + '&carid=' + input.car.ID +
      '&extension=' + extended + '&accessories=' + Object.keys(selectedAccesories).map((k) => k).join(',')
      + '&days=' + input.daysSelected.value + '&late=' + lateReturn,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<Booking>();
    })).subscribe(data => {
        this.bookingAccepted.next(data);

    });
  }

  MakePayment(bookingID: number, callback?: (value: Booking) => void): void{
    this.http.get<Booking>(this.url + 'makePayment?bookingID=' + bookingID,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<Booking>();
    })).subscribe(callback);
  }

  EditBooking(bookingID: number, remove: Accessory[], add: Accessory[], lateReturn: boolean, extension: boolean,
              callback?: (value: any) => void): void{
    this.http.get<Booking>(this.url + 'editBooking?bookingID=' + bookingID + '&remove=' + Object.values(remove).map((k) => k.ID).join(',')
      + '&add=' + Object.values(add).map((k) => k.ID).join(',') + '&lateReturn=' + lateReturn + '&extension=' + extension,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<Booking>();
    })).subscribe(callback);
  }

  GetUsersBookings(): void{
    if (!this.userService.loggedIn){
      return;
    }

    this.http.get<Record<number, Partial<Booking>>>(this.url + 'getUserBookings', { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<Record<number, Partial<Booking>>>();
    })).subscribe(data => {
        this.userBookings.next(data);
    });
  }

  CancelBooking(id: number, callback?: (value: any) => void): void{
    this.http.get<any>(this.url + 'cancelBooking?bookingID=' + id,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<any>();
    })).subscribe(callback);
  }

  GetHistory(id: number, callback?: (value: any) => void): void{
    this.http.get<Status>(this.url + 'history?bookingID=' + id,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<any>();
    })).subscribe(callback);
  }
}
