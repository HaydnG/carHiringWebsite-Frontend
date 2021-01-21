import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';

import {Accessory, Car} from '../car/Car';
import {catchError} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {AccessoryStat, AdminBooking, BookingColumn, BookingStat, BookingStatusType, UserBundle, UserStat} from './admin';
import {User} from '../user/User';


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

  CreateUser(firstname: string, names: string, email: string, password: string, dobstring: string, callback?: (value: User) => void): void {
    this.http.get<User>(this.url + 'createUser?firstname=' + firstname + '&names=' + names + '&email=' +
      email + '&password=' + password + '&dob=' + dobstring, { withCredentials: true }).pipe(catchError(error => {
      return new Observable<User>();
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

  GetUsers(userSearch: string, callback?: (value: any) => void): void{
    this.http.get<User[]>(this.url + 'getUsers?search=' + userSearch,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<User[]>();
    })).subscribe(callback);
  }

  GetQueryingRefundBookings(callback?: (value: any) => void): void{
    this.http.get<BookingColumn[]>(this.url + 'getQueryingRefundBookings',
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<BookingColumn[]>();
    })).subscribe(callback);
  }

  GetCars(fuelTypes: string, gearTypes: string, carTypes: string, carSizes: string, colours: string, search: string, callback?: (value: any) => void): void{
    this.http.get<Car[]>(this.url + 'getCars?fuelTypes=' + fuelTypes + '&gearTypes=' + gearTypes + '&carTypes=' + carTypes +
      '&carSizes=' + carSizes + '&colours=' + colours + '&search=' + search,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<Car[]>();
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

  SetUser(mode: string, value: boolean, userID: string, callback?: (value: any) => void): void{
    this.http.get<any>(this.url + 'setUser?' + 'userID=' + userID + '&mode=' + mode + '&value=' + value,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<any>();
    })).subscribe(callback);
  }

  GetUser(userID: string, callback?: (value: any) => void): void{
    this.http.get<UserBundle>(this.url + 'getUser?' + 'userID=' + userID,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<UserBundle>();
    })).subscribe(callback);
  }

  ProgressBooking(failed: boolean, bookingID: any, callback?: (value: any) => void): void{
    this.http.get<any>(this.url + 'progressBooking?' + 'bookingID=' + bookingID + '&failed=' + failed,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<any>();
    })).subscribe(callback);
  }

  ProcessExtraPayment(bookingID: any, callback?: (value: any) => void): void{
    this.http.get<any>(this.url + 'processExtraPayment?' + 'bookingID=' + bookingID,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<any>();
    })).subscribe(callback);
  }

  ProcessRefund(accept: boolean, bookingID: any, reason: string, callback?: (value: any) => void): void{
    this.http.get<any>(this.url + 'processRefund?' + 'bookingID=' + bookingID + '&accept=' + accept + '&reason=' + reason,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<any>();
    })).subscribe(callback);
  }

  CreateCar(carType: number, colour: number, fuelType: number, gearType: number, size: number, seats: number, price: number, description: string, disabled: boolean, over25: boolean, body: string, callback?: (value: any) => void): void{
    this.http.post(this.url + 'createCar?fuelType=' + fuelType + '&gearType=' + gearType + '&carType=' + carType +
      '&size=' + size + '&colour=' + colour + '&seats=' + seats + '&price=' + price + '&description=' + description + '&disabled=' + disabled + '&over25=' + over25, body,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<any>();
    })).subscribe(callback);
  }

  UpdateCar(carType: number, colour: number, fuelType: number, gearType: number, size: number, seats: number, price: number, description: string, disabled: boolean, carID: string, over25: boolean, body: string, callback?: (value: any) => void): void{
    this.http.post(this.url + 'updateCar?fuelType=' + fuelType + '&gearType=' + gearType + '&carType=' + carType +
      '&size=' + size + '&colour=' + colour + '&seats=' + seats + '&price=' + price + '&description=' + description + '&disabled=' + disabled + '&carID=' + carID + '&over25=' + over25, body,
      { withCredentials: true }).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<any>();
    })).subscribe(callback);
  }
}
