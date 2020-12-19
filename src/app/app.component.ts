import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  template: `
  <div class="toolbar" role="banner">
    <app-navbar></app-navbar>
  </div>

  <div class="content" role="main">
    <router-outlet></router-outlet>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Frontend';

  constructor(private elementRef: ElementRef, private cookieService: CookieService) {

  }


  ngAfterViewInit(): void{
  }
}
