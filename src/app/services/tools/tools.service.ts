import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DecimalPipe} from '@angular/common';
import {BookingStatusType} from '../admin/admin';

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

    if (days < 0 || hours < 0 || mins < 0 || seconds < 0){
      return '00:00:00:00';
    }

    return this.decimalPipe.transform(days, '2.') + ':' +
      this.decimalPipe.transform(hours, '2.') + ':' +
      this.decimalPipe.transform(mins, '2.') + ':' +
      this.decimalPipe.transform(seconds, '2.');
  }

  containsProcess(statuses: BookingStatusType[], processID: number): boolean{
    let contains = false;

    statuses.some( (value => {
      if (value.ID === processID){
        contains = true;
        return true;
      }
      return false;

    }));

    return contains;

  }

  round(value: number): string{
    return value.toFixed(1);
  }

  getTimeString(fullDay: boolean, lateReturn: boolean, nextDayBooked: boolean): string {
    if (nextDayBooked){
      return '1:00pm';
    }

    if (!fullDay && !lateReturn){
      return '1:00pm';
    }
    if (fullDay && !lateReturn){
      return 'Before 6:00pm';
    }
    if (lateReturn){
      return 'After 6:00pm';
    }
  }

  getTime(fullDay: boolean, lateReturn: boolean): number {
    if (!fullDay && !lateReturn){
      return 1;
    }
    if (fullDay && !lateReturn){
      return 4;
    }
    if (lateReturn){
      return 6;
    }
  }

  getExtensionDays(fullDay: boolean, lateReturn: boolean, nextDayBooked: boolean): number{
    if (nextDayBooked){
      return 0;
    }

    if (!fullDay && !lateReturn){
      return 0;
    }
    if (fullDay && !lateReturn){
      return 0.5;
    }

    if (lateReturn){
      return 0.6;
    }
  }

  convertDate(value: number): Date {
    return new Date(value * 1000);
  }

  calculateAge(birthday): number {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
