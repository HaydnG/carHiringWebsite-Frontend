import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';

@Component({
  selector: 'app-navbar',
  template: `
  <div class="navbar" role="banner" >
    <span>Banger and Co</span>
    <div class="spacer"></div>


      <app-login *ngIf="!loggedIn; else elseBlock"></app-login>

    <ng-template #elseBlock>
      <div>Welcome back {{this.username}}</div>
    </ng-template>
  </div>

  `,
  styles: [`/*Style sheet*/
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #042A2B;
  color: #FCFCFC;
  min-height: 55px;
  font-weight: 600;
  padding-left: 10px;
  padding-right: 10px;
}
.spacer {
    flex: 1;
}
  `],
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;
  public username: string;

  private itemList: any;
  constructor(private userService: UserService) {
      this.loggedIn = userService.getLoggedIn();
      this.username = userService.getUsername();
  }



  ngOnInit(): void {
  }

}
