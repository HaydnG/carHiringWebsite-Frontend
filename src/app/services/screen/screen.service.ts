import {User} from './User';
import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class ScreenService {
  private url = 'http://' + window.location.hostname + ':8080/userService/';

  isScreenSmall;

  constructor(private http: HttpClient) {
    this.isScreenSmall = window.innerWidth <= 1000;
    window.onresize = () => {
      this.isScreenSmall = window.innerWidth <= 1000;
    };
  }


}
