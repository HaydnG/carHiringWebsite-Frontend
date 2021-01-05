import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AdminService} from '../services/admin/admin.service';
import {NavService} from '../services/nav/nav.service';
import {CarService} from '../services/car/car.service';
import {Router} from '@angular/router';
import {CurrencyService} from '../services/currency/currency.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookingService} from '../services/booking/booking.service';
import {CropperPosition, ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-admin-edit-car',
  template: `
    <div>
      <div class="modal-lg-dialog" style="    margin: 0px;">
        <div class="modal-content" style="border: none !important;">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="    font-size: 20px;">Edit Car</h5>
            <button type="button" class="close" (click)="this.closeBooking()" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row" style="padding: 5px 5px 5px 10px;">
              <div class="col">
                <div class="row" style="">
                  <mat-form-field appearance="legacy" style="width: 100%;text-align: center">
                    <mat-select [(value)]="this.fuelType">
                      <mat-option *ngFor="let fuel of this.fuelTypes" [value]="fuel.ID">
                        {{fuel.Description}}
                      </mat-option>
                    </mat-select>
                    <mat-placeholder>Fuel Type</mat-placeholder>
                  </mat-form-field>
                </div>
                <div class="row" style="">
                  <mat-form-field appearance="legacy" style="width: 100%;text-align: center">
                    <mat-select [(value)]="this.gearType">
                      <mat-option *ngFor="let gear of this.gearTypes" [value]="gear.ID">
                        {{gear.Description}}
                      </mat-option>
                    </mat-select>
                    <mat-placeholder>Gear Type</mat-placeholder>
                  </mat-form-field>
                </div>
                <div class="row" style="">
                  <mat-form-field appearance="legacy" style="width: 100%;text-align: center">
                    <mat-select [(value)]="this.carType">
                      <mat-option *ngFor="let type of this.carTypes" [value]="type.ID">
                        {{type.Description}}
                      </mat-option>
                    </mat-select>
                    <mat-placeholder>Car Type</mat-placeholder>
                  </mat-form-field>
                </div>
                <div class="row" style="">
                  <mat-form-field appearance="legacy" style="width: 100%;text-align: center">
                    <mat-select [(value)]="this.size">
                      <mat-option *ngFor="let size of this.sizes" [value]="size.ID">
                        {{size.Description}}
                      </mat-option>
                    </mat-select>
                    <mat-placeholder>Size</mat-placeholder>
                  </mat-form-field>
                </div>
                <div class="row" style="">
                  <mat-form-field appearance="legacy" style="width: 100%;text-align: center">
                    <mat-select [(value)]="this.colour">
                      <mat-option *ngFor="let colour of this.colours" [value]="colour.ID">
                        {{colour.Description}}
                      </mat-option>
                    </mat-select>
                    <mat-placeholder>Colour</mat-placeholder>
                  </mat-form-field>
                </div>
                <div class="row">
                  <div class="col" style="min-width: 100px; padding: 0px 1px 0px 0px;">
                    <mat-form-field appearance="legacy" style="width: 100%;text-align: center">
                      <input type="number" matInput [(ngModel)]="this.seats">
                      <mat-placeholder>Seats</mat-placeholder>
                    </mat-form-field>
                  </div>
                  <div class="col" style="min-width: 100px; padding: 0px 0px 0px 1px;">
                    <mat-form-field appearance="legacy" style="width: 100%;text-align: center">
                      <input type="number" matInput [(ngModel)]="this.price">
                      <mat-placeholder>Price /day</mat-placeholder>
                    </mat-form-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col" style="min-width: 100px; padding: 0px;">
                    <mat-form-field appearance="legacy" style="width: 100%;text-align: center">
                      <input type="text" matInput [(ngModel)]="this.description">
                      <mat-placeholder>Description</mat-placeholder>
                    </mat-form-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col" style="min-width: 100px; padding: 0px;">
                    <section class="example-section" style="    display: flex;">
                      <mat-checkbox color="warn" style="    margin: auto;
      margin-top: 8px;
      margin-bottom: -10px;" [(ngModel)]="this.over25" class="example-margin">Over 25
                      </mat-checkbox>
                    </section>
                  </div>
                  <div class="col" style="min-width: 100px; padding: 0px;">
                    <section class="example-section" style="    display: flex;">
                      <mat-checkbox color="warn" style="    margin: auto;
      margin-top: 8px;
      margin-bottom: -10px;" [(ngModel)]="this.disabled" class="example-margin">Disabled
                      </mat-checkbox>
                    </section>
                  </div>
                </div>
                <div class="custom-file row" style="    margin-top: 15px;margin-bottom: 10px">
                  <div class="col">
                    <input (change)="fileChangeEvent($event)" type="file" class="custom-file-input" id="customFile">
                    <label style="background-color: #252a2b;
      color: white;" class="custom-file-label" for="customFile"> <span *ngIf="this.width === 0"> Choose file</span>
                      <span *ngIf="this.width !== 0"> {{this.width}} x {{this.height}}</span> </label>
                  </div>
                  <div class="col">
                    <button class="button btn form-control confirm" (click)="this.resetImage()" style="    background-color: #305252;
    color: white;">Reset Image
                    </button>
                  </div>

                </div>
                <div class="row">
                  <img style="    width: 60%;
      margin: auto;" [src]="croppedImage"/>
                </div>
              </div>
              <div class="col">
                <div class="row">

                  <div style="    left: 40%;
    top: 47%;
    position: absolute;
    z-index: 0;
    font-size: 26px;
    color: #ffffff52;"> Car Image
                  </div>
                  <image-cropper style="    max-height: 600px;
    text-align: center;
    min-height: 600px;
    background-color: #00000038;
    min-width: 500px;
    margin-left: 5px;
    box-shadow: inset 0px 0px 8px 0px #000000;"
                                 [imageChangedEvent]="imageChangedEvent"
                                 [maintainAspectRatio]="true"
                                 [aspectRatio]="1/1"
                                 format="jpeg"
                                 [imageURL]="'http://5.70.170.197:8080/cars/' + this.car.Image + '.jpg'"
                                 (imageCropped)="imageCropped($event)"
                                 (imageLoaded)="imageLoaded($event)"
                                 (cropperReady)="cropperReady()"
                                 (loadImageFailed)="loadImageFailed()"
                                 [backgroundColor]="'#00000038'"
                                 [cropper]="this.cropper"
                  ></image-cropper>

                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="button btn form-control confirm" (click)="this.updateCar()" style="    background-color: #305252;
    color: white;">Update Car
            </button>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="this.failMessage" class="failMessage"> Registration failed, please try again or contact support</div>
  `,
  styles: [`
    .mat-form-field {
      height: 45px;
    }

    @keyframes slideInFromLeft {
      0% {
        transform: translateX(0%);
        opacity: 0;
      }
      50% {
        transform: translateX(-5%);
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .failMessage {
      text-align: center;
      top: 100%;
      left: 0% !important;
      position: absolute;
      width: 100%;
      background: #660e0e;
      padding: 3px;
      /* margin: 2px; */
      border-radius: 10px;
      color: white;
      animation: 0.5s ease-out 0s 1 slideInFromLeft;
    }


  `]
})
export class AdminEditCarComponent implements OnInit, OnChanges {

  carTypes;
  colours;
  fuelTypes;
  gearTypes;
  sizes;

  carType = 0;
  colour = 0;
  fuelType = 0;
  gearType = 0;
  size = 0;

  seats;
  price;
  description = '';
  over25 = false;
  disabled = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  base64Image: any = '';

  failMessage = false;

  width = 0;
  height = 0;

  @Input()
  reloadPage;

  @Input()
  car;

  newImage = false;
  oldImage: any;

  cropper: CropperPosition = new (class implements CropperPosition {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  })();

  cropperWidth;
  cropperHeight;

  firstLoad = true;
  constructor(private router: Router, public currencyService: CurrencyService, private modalService: NgbModal,
              private bookingService: BookingService, private activeModal: NgbActiveModal,
              private adminService: AdminService, public navService: NavService, public carService: CarService) {
    this.carService.GetCarAttributes(data => {
      this.carTypes = data[0];
      this.colours = data[1];
      this.fuelTypes = data[2];
      this.gearTypes = data[3];
      this.sizes = data[4];
    });



  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.carType = this.car.CarType.ID;
    this.colour = this.car.Colour.ID;
    this.fuelType = this.car.FuelType.ID;
    this.gearType = this.car.GearType.ID;
    this.size = this.car.Size.ID;
    this.seats = this.car.Seats;
    this.price = this.car.Cost;
    this.description = this.car.Description;
    this.disabled = this.car.Disabled;
    this.over25 = this.car.Over25;
    console.log(this.carType);
  }

  closeBooking(): void{
    this.activeModal.dismiss();
  }

  updateCar(): void {
    if (this.carType === 0 || this.colour === 0 || this.fuelType === 0 || this.gearType === 0 || this.size === 0 || +this.seats === 0 || +this.price === 0
    || this.description === ''){
      this.flashError();
    }


    let image;
    if (this.newImage){
      image = this.base64Image;
    }

    this.adminService.UpdateCar(this.carType, this.colour, this.fuelType, this.gearType, this.size, this.seats, this.price,
      this.description,
      this.disabled, this.car.ID, this.over25,
      image, data => {
      this.reloadPage.emit(true);
    });

    this.activeModal.dismiss();

  }

  flashError(): void{
    (async () => {
      // Do something before delay
      if (!this.failMessage) {
        this.failMessage = true;

        await this.delay(3000);

        this.failMessage = false;
      }

    })();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.newImage = true;

  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.base64Image = event.base64.split(',')[1];
    if (this.firstLoad){
      this.firstLoad = false;
      this.cropperHeight = event.cropperPosition.y2;
      this.cropperWidth = event.cropperPosition.x2;
      this.oldImage = event.base64;
    }else{
      this.newImage = true;
    }
  }
  imageLoaded(image: any): void {
    this.width = image.original.size.width;
    this.height = image.original.size.height;
  }
  cropperReady(): void {
  }
  loadImageFailed(): void {
    // show message
  }

  resetImage(): void{
    this.newImage = false;


    this.cropper.x1 = 0;
    this.cropper.y1 = 0;
    this.cropper.x2 = this.cropperWidth;
    this.cropper.y2 = this.cropperHeight;
    this.croppedImage = this.oldImage;

  }

  delay(ms: number): Promise<unknown> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
