import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserService} from './services/user/user.service';
import {CookieService} from 'ngx-cookie-service';
import {User} from './services/user/User';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  allowAccess: Subject<boolean> = new Subject<boolean>();

  userSubscription;

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    this.userSubscription = this.userService.userChange.subscribe((value) => {
      this.userSubscription.unsubscribe();
      if (value !== undefined) {
        const userToken = value.SessionToken;
        if (userToken === '0' || userToken === undefined) {
          this.cookieService.delete('session-token', '/');
          if (route.data.loggedInRequired || route.data.adminRequired) {
            this.allowAccess.next(false);
            this.router.navigate(['']);
          } else {
            this.allowAccess.next(true);
          }

        } else {
          if (route.data.adminRequired && !this.userService.isAdmin) {
            this.allowAccess.next(false);
            this.router.navigate(['']);
          } else {
            if (this.cookieService.get('session-token') === undefined){
              this.cookieService.set('session-token', userToken, 1 , '/');
            }

            this.allowAccess.next(true);
          }
        }
      }

      return value;

    });


    if (route.data.adminRequired && this.userService.isAdmin){
      return true;
    }



    if (this.userService.loggedIn){
      if (route.data.adminRequired && !this.userService.isAdmin){
        return false;
      }

      return true;
    }

    const reqToken = this.cookieService.get('session-token');
    if (reqToken !== '' && reqToken !== undefined){
      console.log('in AuthGuard');

      this.userService.InitSession(reqToken);
      return this.allowAccess.asObservable().pipe();

    }else if (route.data.loggedInRequired){
      this.router.navigate(['']);
      return false;
    }else{
      return true;
    }
  }
}

