import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';

@Component({
  selector: 'app-navbar',
  template: `
  <div class="navbar" role="banner" >
    <span>Banger and Co</span>
    <div class="spacer"></div>


      <app-login *ngIf="!this.user.Email; else elseBlock"></app-login>

    <ng-template #elseBlock>
      <div>Welcome back {{this.user.FullName}}</div>
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

  public user: User;
  public userSubscription;

  private itemList: any;
  constructor(private userService: UserService) {
    this.user = new User();

    this.userSubscription = this.userService.userChange.subscribe((value) => {
      this.user = value;
    });
  }



  ngOnInit(): void {
  }

}
