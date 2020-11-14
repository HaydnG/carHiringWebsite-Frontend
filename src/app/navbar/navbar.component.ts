import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  template: `
  <div class="navbar" role="banner" >
    <span>Banger and Co</span>
    <div class="spacer"></div>


      <app-login *ngIf="!this.user.SessionToken; else elseBlock"></app-login>

    <ng-template #elseBlock>
      <div>Welcome back {{this.user.FirstName}} | <a (click)="logout()">Logout</a></div>
    </ng-template>
  </div>

  `,
  styles: [`/*Style sheet https://coolors.co/77878b-305252-373e40-488286-b7d5d4*/
  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background-color: #305252;
    color: #D8E8E8;
    min-height: 55px;
    font-weight: 600;
    padding-left: 10px;
    padding-right: 10px;
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

  private itemList: any;
  constructor(private userService: UserService, private cookieService: CookieService) {
    this.user = new User();

    this.userSubscription = this.userService.userChange.subscribe((value) => {
      if (value === null){
        this.user = new User();
      }else {
        this.user = value;
      }
      this.session = this.user.SessionToken;
      this.cookieService.set('session-token', this.session);
      if (this.session === '0' || this.session === undefined){
        this.cookieService.delete('session-token');
        console.log('Removing sessionToken');
      }
    });

    this.session = this.cookieService.get('session-token');
    if (this.session !== '' && this.session !== undefined){
      this.userService.InitSession(this.session);
    }
  }

  logout(): void{
    this.userService.Logout(this.session);
  }


  ngOnInit(): void {
  }

}
