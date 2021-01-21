import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ScreenService {

  isScreenSmall;

  constructor(private http: HttpClient) {
    this.isScreenSmall = window.innerWidth <= 1000;
    window.onresize = () => {
      this.isScreenSmall = window.innerWidth <= 1000;
    };
  }


}
