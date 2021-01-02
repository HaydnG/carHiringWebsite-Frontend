import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Booking, BookingStatus, Status} from '../services/booking/Booking';
import {CurrencyService} from '../services/currency/currency.service';
import {BookingService} from '../services/booking/booking.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-booking-history-card',
  template: `
        <div >
          <div class="modal-dialog" style="max-width: 100%;
    margin: 0px;
    width: 100% !important;">
            <div class="modal-content">
              <div class="modal-header">
                <h2 style="    margin: 0px;" class="modal-title" id="exampleModalLabel">Booking History</h2>
                <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-2 active key">
                    Active Status
                  </div>
                  <div class="col-2 cancelled key">
                    Cancelled
                  </div>
                  <div class="col-2 main key">
                    Milestone
                  </div>
                  <div class="col-2 adminEdit key">
                    Admin Action
                  </div>

                  <div style="position: absolute;
                      right: 5px;">BookingID: <span style="font-weight: bold">{{this.booking.ID}} </span>
                  </div>
                </div>

                  <table style="    width: 100%;" mat-table [dataSource]="this.dataSource" matSort>
                    <ng-container matColumnDef="CompletedDate">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header> Time </th>
                      <td class="time" mat-cell *matCellDef="let element"> {{element.CompletedDate | date:'M/d/yy H:mm:ss'}} </td>
                    </ng-container>
                    <ng-container matColumnDef="ProcessDescription">
                      <th mat-header-cell *matHeaderCellDef> Process </th>
                      <td class="process" mat-cell *matCellDef="let element"> {{element.ProcessDescription}} </td>
                    </ng-container>
                    <ng-container matColumnDef="Description">
                      <th mat-header-cell *matHeaderCellDef> Description </th>
                      <td class="description" mat-cell *matCellDef="let element"> {{element.Description}} </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;" [class.cancelled]="row.ProcessID === this.bookingService.statuses.CanceledBooking" [class.active]="row.Active && row.ProcessID !== this.bookingService.statuses.CanceledBooking" [class.main]="row.BookingPage" [class.adminEdit]="row.AdminID !== 0"></tr>
                  </table>


              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>
  `,
  styles: [`
    .main {
      background-color: #b0b0b0;
    }

    .key {
      width: 92px;
      padding: 5px;
      color: white;
      text-align: center;
    }

    .cancelled {
      background-color: #c34b4b;
    }

    .active {
      background-color: #62b762;
    }

    .adminEdit {
      background-color: #d69956;
    }


    .modal-content {
      display: contents !important;
    }

    :host {
      padding: 0px;
      margin: 0px;
      width: 98% !important;
    }


    hr {
      margin: 2px 0px 2px 0px;
    }

    .time {
      font-weight: 600 !important;
      width: 120px;
      max-width: 50px;
    }

    .process {
      width: 135px;
      max-width: 750px;
    }

    .description {
      width: 500px;
      font-weight: 500 !important;
      font-size: 13px;
    }

    th.mat-header-cell:last-of-type, td.mat-cell:last-of-type, td.mat-footer-cell:last-of-type {
      padding-right: 0px;
    }

    th.mat-header-cell:first-of-type, td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type {
      padding-left: 0px;
    }

    tr.mat-row, tr.mat-footer-row {
      height: 30px !important;
    }


    img {
      width: 100%;
    }

    :host {
      width: 90%;
      margin: 5px auto;
    }
  `]
})
export class BookingHistoryComponent implements OnInit {

  displayedColumns: string[] = ['CompletedDate', 'ProcessDescription', 'Description'];
  dataSource;

  history;

  @Input()
  booking: Booking;

  ngbModalOptions;
  created;

  canceledBookingID = BookingStatus.CanceledBooking;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              private bookingService: BookingService, private activeModal: NgbActiveModal) {
    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

  }

  ngOnInit(): void {
    this.bookingService.GetHistory(this.booking.ID, data => {


      this.history = data;
      for (const value of this.history) {
          value.CompletedDate = new Date(value.Completed * 1000);
      }


      this.dataSource = new MatTableDataSource<Status>(this.history);
      this.dataSource.sort = this.sort;
      console.log(this.history);
    });
  }


  closeBooking(): void{
    this.activeModal.dismiss();
  }

}
