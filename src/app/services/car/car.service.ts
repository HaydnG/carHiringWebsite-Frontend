import {Accessory, Car} from './Car';
import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';
import {TimeRange} from '../../car-page/TimeRange';
import {catchError} from 'rxjs/operators';
import {User} from '../user/User';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';


@Injectable()
export class CarService {
  private url = 'http://' + window.location.hostname + ':8080/carService/';

  carListChange: Subject<Car[]> = new Subject<Car[]>();
  accessoryListChange: Subject<Accessory[]> = new Subject<Accessory[]>();
  carBookingsChange: Subject<TimeRange[]> = new Subject<TimeRange[]>();

  cars;

  currentCarChange: Subject<Car> = new Subject<Car>();

  constructor(private http: HttpClient, private userService: UserService,  private router: Router) {}

  LoadCars(): void {
    this.http.get<Car[]>(this.url + 'getAll').pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<Car[]>();
    })).subscribe(data => {
      this.carListChange.next(data);
      this.cars = Object.assign({}, ...data.map((x) => ({[x.ID]: x})));
      console.log(this.cars);
    });
  }

  LoadCar(ID: number): void{
    if (this.cars !== undefined && this.cars.hasOwnProperty(ID)){
      this.currentCarChange.next(this.cars[ID]);

    }else{
      this.http.get<Car>(this.url + 'get?id=' + ID).pipe(catchError(error => {
        this.router.navigate(['']);
        return new Observable<Car>();
      })).subscribe(data => {
        this.currentCarChange.next(data);
        console.log(data);
      });
    }
  }

  LoadAccessories(start: number, end: number): void{
    this.http.get<Accessory[]>(this.url + 'getAccessories?start=' + start + '&end=' + end).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<Accessory[]>();
    })).subscribe(data => {
      this.accessoryListChange.next(Object.assign({}, ...data.map((x) => ({[x.ID]: x}))));
      console.log(data);
    });
  }

  LoadBookings(start: number, end: number, carid: number): void{
    this.http.get<TimeRange[]>(this.url + 'getBookings?start=' + start + '&end=' + end + '&carid=' + carid).pipe(catchError(error => {
      this.userService.handleError(error);
      return new Observable<TimeRange[]>();
    })).subscribe(data => {
      this.carBookingsChange.next(data);
      console.log(data);
    });
  }


  errorHandler(error: HttpErrorResponse): Observable<Car>  {
    return new Observable<Car>();
  }
}
