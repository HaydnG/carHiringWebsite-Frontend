import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  template: `

    <div class="col" #stickyMenu [class.sticky] = "sticky">
      <div class="row">
        <div class="navbar" role="banner" >
          <div class="col">
            <span>Banger and Co</span>
          </div>
          <div class="col">
            <app-login *ngIf="!this.user.SessionToken; else elseBlock"></app-login>

            <ng-template #elseBlock>
              <div>Welcome back {{this.user.FirstName}} | <a (click)="logout()">Logout</a></div>
            </ng-template>
          </div>
        </div>
      </div>
      <div class="row">
        <input  id="search" class="form-control" placeholder="Search">
      </div>
    </div>

`,
  styles: [`/*Style sheet https://coolors.co/77878b-305252-373e40-488286-b7d5d4*/
  .navbar {
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background-color: #305252;
    color: #D8E8E8;
    min-height: 75px;
    font-weight: 600;
    padding: 0px 10px;
    width: 100%;
  }
  .search{
    top: 76px;
    left: 0px;
    background-color: white;
    color: black;
    width: 100%;
    height: 84px;
    position: absolute;
    text-align: center;
    font-size: 37px;
  }

  .sticky{
    position: fixed;
    top: 0;
    overflow: hidden;
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
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild('stickyMenu') menuElement: ElementRef;
  sticky = false;
  public user: User;
  public userSubscription;
  public session;
  menuPosition: any;

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

  ngAfterViewInit(): void{
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(): void{
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  ngOnInit(): void {
  }

}
