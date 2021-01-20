import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BlackListedComponent, UserService} from '../services/user/user.service';
import {User} from '../services/user/User';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ScreenService} from '../services/screen/screen.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-navbar',
  template: `

    <div class="col sticky" >
      <div class="row">
          <nav class="navbar navbar-expand-md navbar-light" style="    min-height: 50px;">
            <a class="navbar-brand" (click)="home()"><span>Banger and Co</span></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarText">

              <app-login style="    margin-left: auto;max-width: 500px;" *ngIf="!this.userService.loggedIn; else elseBlock"></app-login>

              <ng-template #elseBlock>

                <ul class="navbar-nav mr-auto">

                </ul>


                <ul class="navbar-nav ml-auto">
                  <li class="nav-item" *ngIf="this.userService.loggedIn && this.userService.isAdmin">
                    <a class="nav-link" [routerLink]="['admin']">Admin Panel</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" [routerLink]="['booking']">My Bookings</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" [routerLink]="['']">Home</a>
                  </li>
                  <li class="nav-item dropdown" style="margin-right: 30px">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Welcome back {{this.user.FirstName}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" [routerLink]="['user']">Account details</a>
                      <a class="dropdown-item" [routerLink]="['']">Ask for help</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" (click)="logout()"> Logout</a>
                    </div>
                  </li>
                </ul>
              </ng-template>
            </div>
          </nav>
      </div>
    </div>

`,
  styles: [`/*Style sheet https://coolors.co/77878b-305252-373e40-488286-b7d5d4*/
  .nav-item {
    margin: 0px 15px 0px 15px;
  }
  .navbar {
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background-color: #305252;
    min-height: 75px;
    font-weight: 600;
    padding: 0px 10px;
    width: 100%;
    font-size: 16px;
  }

  .navbar-nav .dropdown-menu {
    position: absolute !important;
    float: none;
  }

  .nav-link{
    color: #D8E8E8 !important;
  }

  .navbar-brand{
    color: #D8E8E8 !important;
  }

  .navbar-text{
    color: #D8E8E8 !important;
  }

  .sticky{
    top: 0;
    z-index: 10;
  }


  a {
    cursor: pointer;
  }

  .spacer {
    flex: 1;
  }
  `],
})
export class NavbarComponent implements OnInit {

  public user: User;
  public userSubscription;
  public session;

  isScreenSmall;

  private itemList: any;
  constructor(private snackBar: MatSnackBar, public userService: UserService, private cookieService: CookieService, private router: Router,
              public screenService: ScreenService) {
    this.user = new User();

    this.userSubscription = this.userService.userChange.subscribe((value) => {
      console.log(value);
      if (value === null || value === undefined){
        this.user = value;
        return;
      }

      if (value.Message !== undefined && value.Message === 'incorrect'){
        this.snackBar.openFromComponent(BadLoginComponent, {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
      this.user = value === null ? new User() : value;
    });

  }

  logout(): void{
    this.userService.Logout();
    this.home();
  }

  ngOnInit(): void {

  }

  home(): void{
    this.router.navigate(['']);
  }

}
@Component({
  selector: 'app-bad-login',
  template: `<div class="snack">Incorrect Username/Password</div>`,
  styles: [`
    .snack {
      color: #f84646;
      font-size: 20px;
      text-align: center;
    }
  `],
})
export class BadLoginComponent {}

