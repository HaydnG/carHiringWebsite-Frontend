import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car/car.service';
import {AdminService} from '../services/admin/admin.service';
import {NavService} from '../services/nav/nav.service';

@Component({
  selector: 'app-admin-booking-page',
  template: `
    <div (click)="this.navService.Back('/admin/booking')" style="
    position: absolute;
    color: white;
    font-size: 40px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 20px">&larr;</div>
    <h1 style="        text-align: center;
    color: white;
    font-size: 36px;
    margin-bottom: 28px;
    text-decoration: underline;
    text-underline-offset: 1px;
    text-shadow: 2px 5px 15px #000000;
}">Admin Users</h1>

  `,
  styles: [`

    th {
      font-size: 17px;
    }

    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 70%;
    }
  `]
})
export class AdminUserComponent implements OnInit {

  constructor(private adminService: AdminService, public navService: NavService) {

  }

  ngOnInit(): void {

  }

}
