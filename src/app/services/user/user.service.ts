import {User} from './User';
import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  private url = 'http://' + window.location.hostname + ':8080/userService/';

  userChange: Subject<User> = new Subject<User>();

  a = `qwfdqewf`;

  repeat = false;
  loggedIn = false;


  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  Login(email: string, password: string): void {
    this.http.get<User>(this.url + 'login?email=' + email + '&password=' + password).pipe(catchError(error => {
      this.handleError(error);
      return new Observable<User>();
    })).subscribe(data => {
      this.userChange.next(data);
      this.repeat = data.Repeat;
      this.loggedIn = data.SessionToken.length > 10;
      console.log(data);
    });
  }

  Logout(sessionToken: string): void {
    this.http.get<User>(this.url + 'logout', { withCredentials: true }).pipe(catchError(error => {
      this.handleError(error);
      return new Observable<User>();
    })).subscribe(data => {
      this.userChange.next(data);
      this.loggedIn = false;
      this.repeat = false;
      console.log(data);
    });
  }

  Register(firstname: string, names: string, email: string, password: string, dobstring: string): void {
    this.http.get<User>(this.url + 'register?firstname=' + firstname + '&names=' + names + '&email=' +
      email + '&password=' + password + '&dob=' + dobstring).pipe(catchError(error => {
      this.handleError(error);
      return new Observable<User>();
    })).subscribe(data => {
      this.userChange.next(data);
      console.log(data);
    });
  }

  InitSession(session: string): void {
    if (session === ''){
      return;
    }

    this.http.get<User>(this.url + 'sessionCheck', { withCredentials: true }).pipe(catchError(error => {
      this.handleError(error);
      return new Observable<User>();
    })).subscribe(data => {
      this.repeat = data.Repeat;
      this.loggedIn = data.SessionToken.length > 10;
      this.userChange.next(data);
    });
  }


  handleError(error: HttpErrorResponse): void{
    this.cookieService.delete('session-token');
    this.loggedIn = false;
    this.userChange.next(new User());
    this.repeat = false;
    this.router.navigate(['']);
    console.log('Removing sessionToken');
  }
}

