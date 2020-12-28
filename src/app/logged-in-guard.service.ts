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
      const userToken = value.SessionToken;
      if (userToken === '0' || userToken === undefined){

        if (route.data.loggedInRequired){
          this.allowAccess.next(false);
        }else {
          this.allowAccess.next(true);
        }
        this.cookieService.delete('session-token');
      }else {
        this.allowAccess.next(true);
        this.cookieService.set('session-token', userToken);
      }
      this.userSubscription.unsubscribe();

      return value;
    });


    if (this.userService.loggedIn){
      return true;
    }

    const reqToken = this.cookieService.get('session-token');
    if (reqToken !== '' && reqToken !== undefined){

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

