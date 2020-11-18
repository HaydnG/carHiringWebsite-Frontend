import {Car} from './Car';
import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';


@Injectable()
export class CarService {
  private url = 'http://localhost:8080/carService/';

  carListChange: Subject<Car[]> = new Subject<Car[]>();


  constructor(private http: HttpClient) {}

  Get(): void {
    this.http.get<Car[]>(this.url + 'get').subscribe(data => {
      this.carListChange.next(data);
      console.log(data);
    });
  }



  errorHandler(error: HttpErrorResponse): Observable<Car>  {
    return new Observable<Car>();
  }
}
