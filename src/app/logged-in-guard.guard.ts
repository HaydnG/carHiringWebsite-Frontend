import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './services/user/user.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardGuard implements CanActivate {


  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.userService.loggedIn){
      return true;
    }

    const session = this.cookieService.get('session-token');
    if (session !== '' && session !== undefined){
      this.userService.userChange.subscribe((value) => {
          if (!this.userService.loggedIn){
            this.router.navigate(['']);
          }
      });
      return true;
    }

    this.router.navigate(['']);

    return false;
  }
}
