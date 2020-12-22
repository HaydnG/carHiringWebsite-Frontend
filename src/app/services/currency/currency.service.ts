import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class CurrencyService {


  private Currformatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumSignificantDigits: 2,
  });

  constructor(private http: HttpClient) {}


  FormatValue(value: number): string{
    return this.Currformatter.format(value);
  }

}
