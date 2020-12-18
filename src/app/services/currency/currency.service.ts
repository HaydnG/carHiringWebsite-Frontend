import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

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
