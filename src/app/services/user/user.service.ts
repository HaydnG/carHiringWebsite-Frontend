import {User} from './User';
import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class UserService {
  private url = 'http://' + window.location.hostname + ':8080/userService/';

  userChange: Subject<User> = new Subject<User>();

  loggedIn = false;

  constructor(private http: HttpClient) {}

  Login(email: string, password: string): void {
    this.http.get<User>(this.url + 'login?email=' + email + '&password=' + password).subscribe(data => {
      this.userChange.next(data);
      this.loggedIn = data.SessionToken.length > 10;
      console.log(data);
    });
  }

  Logout(sessionToken: string): void {
    this.http.get<User>(this.url + 'logout', { withCredentials: true }).subscribe(data => {
      this.userChange.next(data);
      this.loggedIn = false;
      console.log(data);
    });
  }

  Register(firstname: string, names: string, email: string, password: string, dobstring: string): void {
    this.http.get<User>(this.url + 'register?firstname=' + firstname + '&names=' + names + '&email=' +
      email + '&password=' + password + '&dob=' + dobstring).pipe(catchError(error => {
        return of(null);
    })).subscribe(data => {
      this.userChange.next(data);
      console.log(data);
    });
  }

  InitSession(session: string): void {
    if (session === ''){
      return;
    }

    this.http.get<User>(this.url + 'sessionCheck', { withCredentials: true }).pipe(catchError(this.errorHandler)).subscribe(data => {
      this.userChange.next(data);
      this.loggedIn = data.SessionToken.length > 10;
    });
  }

  errorHandler(error: HttpErrorResponse): Observable<User>  {
    return new Observable<User>();
  }
}
