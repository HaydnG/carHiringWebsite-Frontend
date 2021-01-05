import {User} from './User';
import {Injectable, Directive, Component} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, of, Subject} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {ToolsService} from '../tools/tools.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class UserService {
  private url = 'http://' + window.location.hostname + ':8080/userService/';

  userChange: Subject<User> = new Subject<User>();

  repeat = false;
  loggedIn = false;
  isAdmin = false;
  over25 = false;
  blackListed = false;


  constructor(private snackBar: MatSnackBar, private http: HttpClient, private cookieService: CookieService, private router: Router, private toolService: ToolsService) {}

  Login(email: string, password: string, callback: any): void {
    this.http.get<User>(this.url + 'login?email=' + email + '&password=' + password).pipe(catchError(error => {
      this.handleError(error);
      return new Observable<User>();
    })).subscribe(data => {
      this.userChange.next(data);

      if (data.SessionToken !== undefined && data.SessionToken !== ''){
        const dob = new Date(data.DOB * 1000);
        this.over25 = this.toolService.calculateAge(dob) >= 25;
        this.blackListed =  data.Blacklisted;
        if (data.Blacklisted){
          this.snackBar.openFromComponent(BlackListedComponent, {
            duration: 3000,
            verticalPosition: 'top'
          });
        }

        this.repeat = data.Repeat;
        this.loggedIn = data.SessionToken.length > 10;
        this.isAdmin = data.Admin;
        this.cookieService.set('session-token', data.SessionToken, 1 , '/');

        if (callback !== undefined){
          callback();
        }
      }

      console.log(data);
    });
  }

  Logout(): void {
    this.http.get<User>(this.url + 'logout', { withCredentials: true }).pipe(catchError(error => {
      this.handleError(error);
      return new Observable<User>();
    })).subscribe(data => {
      this.userChange.next(data);
      this.loggedIn = false;
      this.repeat = false;
      this.isAdmin = false;
      this.over25 = false;
      this.blackListed = false;
      this.cookieService.delete('session-token', '/');
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
      this.isAdmin = data.Admin;
      this.blackListed =  data.Blacklisted;
      this.userChange.next(data);
      const dob = new Date(data.DOB * 1000);
      this.over25 = this.toolService.calculateAge(dob) >= 25;
      if (data.Blacklisted){

        this.snackBar.openFromComponent(BlackListedComponent, {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }

  getAuthenticated(): Observable<any> {
    return ;
  }


  handleError(error: HttpErrorResponse): void{
    this.cookieService.delete('session-token', '/');
    this.userChange.next(new User());
    this.loggedIn = false;
    this.repeat = false;
    this.isAdmin = false;
    this.router.navigate(['']);
    console.log('Removing sessionToken');

  }
}

@Component({
  selector: 'app-blacklisted',
  template: `<div class="snack">You have been blackListed from making bookings.<br><br>Please contact support</div>`,
  styles: [`
    .snack {
      color: #f84646;
      font-size: 20px;
      text-align: center;
    }
  `],
})
export class BlackListedComponent {}
