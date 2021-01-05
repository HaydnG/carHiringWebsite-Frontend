import {Component, EventEmitter, OnInit} from '@angular/core';
import {CarService} from '../services/car/car.service';
import {AdminService} from '../services/admin/admin.service';
import {NavService} from '../services/nav/nav.service';

@Component({
  selector: 'app-admin-booking-page',
  template: `
    <div (click)="this.navService.Back('/admin')" style="
    position: absolute;
    color: white;
    font-size: 40px;
    cursor: pointer;
    text-shadow: 2px 5px 15px #000000;
    width: 20px">&larr;
    </div>
    <h1 style="        text-align: center;
    color: white;
    font-size: 36px;
    margin-bottom: 28px;
    text-decoration: underline;
    text-underline-offset: 1px;
    text-shadow: 2px 5px 15px #000000;
}">Admin Users</h1>
    <div class="card-deck" style="    justify-content: center;">
      <div class="card adminPanel">
        <div class="card-body ">
          <div class="row" style="margin-left: -5px;
    margin-right: -5px;">
            <div class="col-4">

            </div>
            <div class="col">
              <mat-form-field appearance="legacy" style="margin: auto; width: 100%;     height: 35px;    text-align: center;">
                <input style="color: white;" matInput [(ngModel)]="this.userSearchInput" (keyup)="onSearch()">
                <mat-placeholder class="placeholder">User Search</mat-placeholder>
              </mat-form-field>
            </div>

            <div class="col" style="    min-width: 200px;">
              <button class="button btn form-control confirm" (click)="this.createUser()" style="    background-color: #305252;
    color: white;    height: 42px;">Create User</button>
            </div>

          </div>
          <div class="row" style="margin-left: -5px;
    margin-right: -5px;">

            <app-admin-user-table [reload]="this.reload" style="padding: 1px 5px 1px 5px;" [users]="this.userList"></app-admin-user-table>

          </div>
        </div>
      </div>
    </div>

  `,
  styles: [`
    .mat-select-value {
      color: white;
    }

    .card-deck{
      display: flex;
      flex-flow: row wrap;
      margin-right: -5px;
      margin-left: -5px;
    }

    .inputBut {
      background-color: #3f4447;
      height: 28.1px;
      text-align: center;
      padding: 0px;
      margin-top: 11px;
      border-bottom: 1.5px #305152 solid;
      cursor: pointer;
    }

    .inputBut:hover {
      background-color: #393d40;
    }

    .placeholder {
      color: #b5b5b5;
    }

    .card-body {
      flex: 1 1 auto;
      min-height: 1px;
      padding: 6px;
    }

    .card {
      margin-bottom: 10px;
    }

    .Waiting {
      color: #d68149;
    }
    .adminPanel {
      width: 100%;
      background-color: #252a2b;
      color: white;
      border: 2px solid #5f5f5f;
      border-radius: 8px;
      min-width: 49%;
      margin: 5px 5px 5px 5px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 0.3rem;
      margin-top: -6px;
    }

    th {
      font-size: 15px;
    }

    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 80%;
    }
    th {
      font-size: 17px;
    }

    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 70%;
    }


    :host {
      margin-top: 10px;
      overflow: hidden;
      width: 80%;
    }

    @media screen and (max-width: 1700px) {
      :host {
        width: 90%;
      }
    }

    @media screen and (max-width: 1400px) {
      :host {
        width: 95%;
      }
    }

    @media screen and (max-width: 800px) {
      :host {
        width: 98%;
      }
    }

    @media screen and (max-width: 500px) {
      :host {
        width: 100%;
      }
    }
  `]
})
export class AdminUserComponent implements OnInit {

  userList;
  reload: EventEmitter<any> = new EventEmitter<any>();

  userSearchInput = '';

  constructor(private adminService: AdminService, public navService: NavService) {
    this.adminService.GetUsers(this.userSearchInput, data => {
      this.userList = data;
    });
  }

  ngOnInit(): void {

  }

  createUser(): void {

  }

  onSearch(): void {
    this.adminService.GetUsers(this.userSearchInput, data => {
      this.userList = data;
    });
  }
}
