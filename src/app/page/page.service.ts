import {Injectable, Directive, Component} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable()
export class PageService {
  private url = 'http://localhost:8080/userService/';

  pageChange: Subject<Page> = new Subject<Page>();

  ChangePage(type: PageType, data: any): void {
    this.pageChange.next(new Page(type, data));
  }

  constructor() {}


}

export class Page {
  ID: PageType;
  Data: any;

  constructor(type: PageType, data: any) {
    this.ID = type;
    this.Data = data;
  }
}

export enum PageType {
  carList = 1,
  carView
}
