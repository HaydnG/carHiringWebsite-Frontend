import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DecimalPipe} from '@angular/common';

@Injectable()
export class ToolsService {




  constructor(private http: HttpClient, private decimalPipe: DecimalPipe) {}



  formatCountdown(value: number): string {
    const days = Math.floor(value / 86400000);
    value = value % 86400000;
    const hours = Math.floor(value / 3600000);
    value = value % 3600000;
    const mins = Math.floor(value / 60000);
    value = value % 60000;
    const seconds = Math.floor(value / 1000);

    return this.decimalPipe.transform(days, '2.') + ':' +
      this.decimalPipe.transform(hours, '2.') + ':' +
      this.decimalPipe.transform(mins, '2.') + ':' +
      this.decimalPipe.transform(seconds, '2.');
  }

}
