import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';

import {Accessory, Car} from '../car/Car';
import {catchError} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {AccessoryStat, AdminBooking, BookingColumn, BookingStat, BookingStatusType, UserStat} from './admin';


@Injectable()
export class AdminService {
  private url = 'http://' + window.location.hostname + ':8080/adminService/';


  constructor(private http: HttpClient, private  userService: UserService) {}

  GetBookingStatuses(callback?: (value: any) => void): void{
    this.http.get<BookingStatusType[]>(this.url + 'getBookingStatuses',
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<BookingStatusType[]>();
    })).subscribe(callback);
  }


  GetBookingStats(callback?: (value: any) => void): void{
    this.http.get<BookingStat[]>(this.url + 'getBookingStats',
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<BookingStat[]>();
    })).subscribe(callback);
  }

  GetUserStats(callback?: (value: any) => void): void{
    this.http.get<UserStat>(this.url + 'getUserStats',
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<UserStat>();
    })).subscribe(callback);
  }

  GetCarStats(callback?: (value: any) => void): void{
    this.http.get<UserStat>(this.url + 'getCarStats',
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<UserStat>();
    })).subscribe(callback);
  }

  GetAccessoryStats(callback?: (value: any) => void): void{
    this.http.get<AccessoryStat>(this.url + 'getAccessoryStats',
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<AccessoryStat>();
    })).subscribe(callback);
  }

  GetQueryingRefundBookings(callback?: (value: any) => void): void{
    this.http.get<BookingColumn[]>(this.url + 'getQueryingRefundBookings',
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<BookingColumn[]>();
    })).subscribe(callback);
  }

  GetAwaitingBookings(status: number, limit: number, callback?: (value: any) => void): void{
    this.http.get<BookingColumn[]>(this.url + 'getAwaitingBookings?status=' + status + '&limit=' + limit,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<BookingColumn[]>();
    })).subscribe(callback);
  }

  GetSearchedBookings(userSearch: string, bookingSearch: string, statusFilter: string, callback?: (value: any) => void): void{
    this.http.get<BookingColumn[]>(this.url + 'getSearchedBookings?' + 'userSearch=' + userSearch + '&bookingSearch=' + bookingSearch +
      '&statusFilter=' + statusFilter,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<BookingColumn[]>();
    })).subscribe(callback);
  }

  GetBooking(bookingID: string, callback?: (value: any) => void): void{
    this.http.get<AdminBooking>(this.url + 'getBooking?' + 'bookingID=' + bookingID,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<AdminBooking>();
    })).subscribe(callback);
  }

  ProgressBooking(bookingID: any, callback?: (value: any) => void): void{
    this.http.get<any>(this.url + 'progressBooking?' + 'bookingID=' + bookingID,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<any>();
    })).subscribe(callback);
  }
}
