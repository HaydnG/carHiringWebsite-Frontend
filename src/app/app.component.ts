import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {UserService} from './user/user.service';
import {PageService, PageType} from './page/page.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="toolbar" role="banner">
    <app-navbar></app-navbar>
  </div>

  <div class="content" role="main" [ngSwitch]="this.pageID">
      <app-car-list *ngSwitchCase="this.PageEnum.carList"></app-car-list>
      <app-car-card *ngSwitchCase="this.PageEnum.carView"
                    [car]="this.pageData"
                    style='margin-top: 100px;'
      ></app-car-card>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Frontend';
  pageSubscription;
  pageID = 1;
  pageData;
  public PageEnum = PageType;

  constructor(private elementRef: ElementRef, private pageService: PageService) {
    this.pageSubscription = this.pageService.pageChange.subscribe((value) => {
      this.pageID = value.ID;
      this.pageData = value.Data;
    });

  }


  ngAfterViewInit(): void{
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#373E40';
  }
}
