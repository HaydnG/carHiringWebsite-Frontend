import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {UserService} from './user/user.service';
import {PageService, PageType} from './page/page.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  template: `
  <div class="toolbar" role="banner">
    <app-navbar></app-navbar>
  </div>

  <div class="content" role="main" [ngSwitch]="this.pageID">
      <app-car-list *ngSwitchCase="this.PageEnum.carList"></app-car-list>
      <app-car-page *ngSwitchCase="this.PageEnum.carView"
                    [car]="this.pageData"
                    style='margin-top: 100px;width: 70%;'
      ></app-car-page>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Frontend';
  pageSubscription;
  pageID = 1;
  pageData;
  public PageEnum = PageType;

  constructor(private elementRef: ElementRef, private pageService: PageService, private cookieService: CookieService) {
    this.pageSubscription = this.pageService.pageChange.subscribe((value) => {
      this.pageID = value.ID;
      this.pageData = value.Data;
      this.cookieService.set('page-data', JSON.stringify(value));
    });

    const json = this.cookieService.get('page-data');
    console.log(json);
    if ( json.length > 0){
      try {
        const data = JSON.parse(json);
        this.pageID = data.ID;
        this.pageData = data.Data;
      } catch (e) {
        this.cookieService.delete('page-data');
        this.pageID = 1;
        this.pageData = undefined;
      }

    }

  }


  ngAfterViewInit(): void{
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#373E40';
  }
}
